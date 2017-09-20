import {
  Injectable, Injector,
  ApplicationRef, EmbeddedViewRef, ComponentFactory, TemplateRef
} from '@angular/core';

import { NgxModalWindow } from './modal-window';
import { NgxModalRef } from './modal-ref';
import { NgxModalOptions } from './ngx-modal-options';
import { NgxActiveModal } from './ngx-active-modal';
import { NgxModalGlobalOptions } from './ngx-modal-global-options';


export class TemplateModalRef<ModalContext extends NgxActiveModal> extends NgxModalRef {

  protected _context: ModalContext = null;
  protected _viewContainerRef: EmbeddedViewRef<ModalContext>;

  public get context(): ModalContext { return this._context; }
  public get viewContainerRef(): EmbeddedViewRef<ModalContext> { return this._viewContainerRef; }


  constructor(
    // Get view, component or node array to push into ng-content of Modal
    _templateRef: TemplateRef<ModalContext>,
    _context: ModalContext,
    _options: NgxModalOptions,
    _injector: Injector,
    _applicationRef: ApplicationRef,
    _windowFactory: ComponentFactory<NgxModalWindow>,
    _globalOptions: NgxModalGlobalOptions
  ) {

    // Load injectors and factories
    super(_options, _injector, _applicationRef, _windowFactory, _globalOptions);

    // console.log(context);
    this._viewContainerRef = _templateRef.createEmbeddedView(_context);

    this._applicationRef.attachView(this._viewContainerRef);

    // Set-Up context and nodes
    this._context = this._viewContainerRef.context;
    this._nodes = [this._viewContainerRef.rootNodes];

    // Init modal
    this.init();

  }

  protected _removeModalElements() {
    super._removeModalElements();
    this._viewContainerRef.destroy();
  }

}
