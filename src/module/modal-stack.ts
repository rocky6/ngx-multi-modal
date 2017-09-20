import {
  ApplicationRef,
  ComponentFactory, ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injectable, Injector, TemplateRef, Type
} from '@angular/core';

import { NgxModalRef } from './modal-ref';
import { isNullOrUndefined } from './util';
import { NgxModalBackdrop } from './modal-backdrop';
import { StringModalRef } from './string-modal-ref';
import { ComponentModalRef } from './component-modal-ref';
import { TemplateModalRef } from './template-modal-ref';
import { NgxActiveModal } from './ngx-active-modal';
import { NgxModalWindow } from './modal-window';
import { NgxModalGlobalOptions } from './ngx-modal-global-options';
import { NgxModalOptions } from './ngx-modal-options';


export interface INgxActiveModal {
  close?: (result?: any) => void;
  dismiss?: (reason?: any) => void;
}


/**
 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
 * the "open" method!
 */
@Injectable()
export class NgxModalStack {

  private _ngbModalRefStack: NgxModalRef[] = [];

  private _baseIndex = 1050;
  private _currentIndex = this._baseIndex;

  private _backdropFactory: ComponentFactory<NgxModalBackdrop>;
  private _backdropCmptRef: ComponentRef<NgxModalBackdrop>;

  private _windowFactory: ComponentFactory<NgxModalWindow>;

  public onRegister = new EventEmitter<number>();
  public onUnregister = new EventEmitter<number>();

  public get count(): number { return this._ngbModalRefStack.length; }

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _applicationRef: ApplicationRef,
    private _injector: Injector,
    private _globalOptions: NgxModalGlobalOptions,
  ) {
    this._backdropFactory = _componentFactoryResolver.resolveComponentFactory(NgxModalBackdrop);
    this._windowFactory = _componentFactoryResolver.resolveComponentFactory(NgxModalWindow);
  }


  public openFromString(data: string, options: NgxModalOptions = {}): StringModalRef {

    // Clone options
    options = Object.assign({}, options);

    const modalRef = new StringModalRef(
      data,
      options,
      this._injector,
      this._applicationRef,
      this._windowFactory,
      this._globalOptions
    );

    this.register(modalRef);
    return modalRef;

  }


  public openFromComponent<ComponentType>(
    component: Type<ComponentType>,
    options: NgxModalOptions = {}
  ): ComponentModalRef<ComponentType> {

    // Clone options
    options = Object.assign({}, options);

    const modalRef =  new ComponentModalRef<ComponentType>(
      this._componentFactoryResolver,
      component,
      options,
      this._injector,
      this._applicationRef,
      this._windowFactory,
      this._globalOptions
    );

    this.register(modalRef);
    return modalRef;

  }


  public openFromTemplate<ContextType extends INgxActiveModal>(
    template: TemplateRef<ContextType>,
    context: ContextType,
    options: NgxModalOptions = {}
  ): TemplateModalRef<ContextType & NgxActiveModal> {

    // Clone options
    options = Object.assign({}, options);

    // We have to implement missing methods if they are not set
    context.dismiss =
      context.dismiss || function (reason?: any): void {};

    context.close =
      context.close || function (result?: any): void {};

    const modalRef =  new TemplateModalRef<ContextType & NgxActiveModal>(
      template as TemplateRef<ContextType & NgxActiveModal>,
      context as ContextType & NgxActiveModal,
      options,
      this._injector,
      this._applicationRef,
      this._windowFactory,
      this._globalOptions
    );

    this.register(modalRef);
    return modalRef;

  }


  public closeAll(result: any) {
    for (let i = this.count - 1; i >= 0; i--) {
      try {
        this.get(i).close(result);
      } catch (e) {
        console.log('Failed to close modal', e);
      }

    }
  }


  public dismissAll(result: any) {
    for (let i = this.count - 1; i >= 0; i--) {
      try {
        this.get(i).dismiss(result);
      } catch (e) {
        console.log('Failed to dismiss modal', e);
      }

    }
  }


  public getAll() {
    return this._ngbModalRefStack;
  }


  public get(index: number) {
    return this._ngbModalRefStack[index];
  }


  private register (modalRef: NgxModalRef) {

    this._currentIndex += 50;
    modalRef.modal.instance.zIndex = this._currentIndex.toString();

    this._ngbModalRefStack.push(modalRef);


    // Init backdrop
    if (this._globalOptions.backdrop !== false) {
      if (isNullOrUndefined(this._backdropCmptRef)) {
        this._backdropCmptRef = this._backdropFactory.create(this._injector);
        this._applicationRef.attachView(this._backdropCmptRef.hostView);
        modalRef.container.appendChild(this._backdropCmptRef.location.nativeElement);
      }
      this._backdropCmptRef.instance.zIndex = (this._currentIndex - 10).toString();
    }

    modalRef.result.then(() => {
      this.unregister(modalRef);
    }, () => {
      this.unregister(modalRef);
    });

    this.onRegister.next(this._ngbModalRefStack.indexOf(modalRef));
  }


  private unregister (modalRef: NgxModalRef) {

    const index = this._ngbModalRefStack.indexOf(modalRef);

    // Modal not found
    if (index === - 1) {
      return;
    }

    this._ngbModalRefStack.splice(index, 1);

    if (this.count > 0) {
      const previous = this.get(this.count - 1).modal;
      if (!isNullOrUndefined(previous)) {
        this._currentIndex = Number.parseInt(previous.instance.zIndex);
      }
    } else {
      // Restore z-index, if last modal is popped
      this._currentIndex = this._baseIndex;
    }

    if (!isNullOrUndefined(this._backdropCmptRef) && this.count === 0) {
      const backdropNativeEl = this._backdropCmptRef.location.nativeElement;
      backdropNativeEl.parentNode.removeChild(backdropNativeEl);
      this._backdropCmptRef.destroy();
      this._backdropCmptRef = null;
    } else if (this._backdropCmptRef) {
      this._backdropCmptRef.instance.zIndex = (this._currentIndex - 10).toString();
    }

    this.onUnregister.next(index);
  }

}
