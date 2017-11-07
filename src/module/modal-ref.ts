import { Injectable, ComponentRef, Injector, ComponentFactory, ApplicationRef } from '@angular/core';

import { NgxModalWindow } from './modal-window';

import { NgxModalOptions } from './ngx-modal-options';
import { NgxActiveModal } from './ngx-active-modal';
import { NgxModalGlobalOptions } from './ngx-modal-global-options';
import { isNullOrUndefined } from './util';

/**
 * A reference to a newly opened modal.
 */
export class NgxModalRef {
  protected _resolve: (result?: any) => void;
  protected _reject: (reason?: any) => void;

  // container of the window
  protected _containerEl: Element;

  protected _windowCmptRef: ComponentRef<NgxModalWindow>;

  protected _context: NgxActiveModal = null;
  protected _nodes: any[][] = [];

  public get context(): NgxActiveModal { return this._context; }
  public get options(): NgxModalOptions { return this._options; }
  public get container(): Element { return this._containerEl; }
  public get modal(): ComponentRef<NgxModalWindow> { return this._windowCmptRef; }

  /**
   * A promise that is resolved when a modal is closed and rejected when a modal is dismissed.
   */
  result: Promise<any>;


  constructor(
    protected _options: NgxModalOptions,
    protected _injector: Injector,
    protected _applicationRef: ApplicationRef,
    protected _windowFactory: ComponentFactory<NgxModalWindow>,
    protected _globalOptions: NgxModalGlobalOptions
  ) {}

  protected init() {

    // Init container
    const containerSelector = this._globalOptions.container;
    this._containerEl = document.querySelector(containerSelector);

    if (!this._containerEl) {
      throw new Error(`The specified modal container "${containerSelector}" was not found in the DOM.`);
    }

    // Init window
    this._windowCmptRef = this._windowFactory.create(this._injector, this._nodes);
    this._applicationRef.attachView(this._windowCmptRef.hostView);
    this._containerEl.appendChild(this._windowCmptRef.location.nativeElement);

    // Apply Options to window
    ['keyboard', 'size', 'windowClass', 'dismissOnBackdropClick'].forEach((optionName: string) => {
      if (!isNullOrUndefined(this._options[optionName])) {
        this._windowCmptRef.instance[optionName] = this._options[optionName];
      } else if (!isNullOrUndefined(this._globalOptions[optionName])) {
        this._windowCmptRef.instance[optionName] = this._globalOptions[optionName];
      }
    });

    this._windowCmptRef.instance.backdrop = this._globalOptions.backdrop;

    // Redefine close and dismiss methods
    if (this._context) {
      this._context.close = (result: any) => { this.close(result); };
      this._context.dismiss = (reason: any) => { this.dismiss(reason); };
    }

    this._windowCmptRef.instance.dismissEvent.subscribe((reason: any) => { this.dismiss(reason); });
    this.result = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  /**
   * Can be used to close a modal, passing an optional result.
   */
  close(result?: any): void {
    if (this._windowCmptRef) {
      this._resolve(result);
      this._removeModalElements();
    }
  }

  /**
   * Can be used to dismiss a modal, passing an optional reason.
   */
  dismiss(reason?: any): void {
    if (this._windowCmptRef) {
      this._reject(reason);
      this._removeModalElements();
    }
  }

  protected _removeModalElements() {
    const windowNativeEl = this._windowCmptRef.location.nativeElement;
    windowNativeEl.parentNode.removeChild(windowNativeEl);
    this._windowCmptRef.destroy();

    this._windowCmptRef = null;
  }
}
