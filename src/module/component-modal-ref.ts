import {
  Injectable, ComponentRef, Injector,
  ApplicationRef, ComponentFactory, ComponentFactoryResolver, ReflectiveInjector, Type
} from '@angular/core';

import { NgxModalWindow } from './modal-window';
import { NgxModalRef } from './modal-ref';
import { NgxActiveModal } from './ngx-active-modal';
import { NgxModalOptions } from './ngx-modal-options';
import { NgxModalGlobalOptions } from './ngx-modal-global-options';


export class ComponentModalRef<ComponentType> extends NgxModalRef {

  protected _componentRef: ComponentRef<ComponentType>;

  public get componentRef(): ComponentRef<ComponentType> { return this._componentRef; }
  public get instance(): ComponentType { return this._componentRef.instance; }


  constructor(
    // Get view, component or node array to push into ng-content of Modal
    _componentFactoryResolver: ComponentFactoryResolver,
    _component: Type<ComponentType>,
    _options: NgxModalOptions,
    _injector: Injector,
    _applicationRef: ApplicationRef,
    _windowFactory: ComponentFactory<NgxModalWindow>,
    _globalOptions: NgxModalGlobalOptions
  ) {

    // Load injectors and factories
    super(_options, _injector, _applicationRef, _windowFactory, _globalOptions);


    const contentCmptFactory = _componentFactoryResolver.resolveComponentFactory<ComponentType>(_component);
    const modalContentInjector = ReflectiveInjector.resolveAndCreate(
      [{provide: NgxActiveModal, useValue: new NgxActiveModal()}],
      this._options.injector || this._injector
    );
    this._componentRef = contentCmptFactory.create(modalContentInjector);

    // Set-Up context and nodes
    this._context = this._componentRef.injector.get(NgxActiveModal);
    this._nodes = [[this._componentRef.location.nativeElement]];

    this._applicationRef.attachView(this._componentRef.hostView);

    // Init modal
    this.init();

  }

  protected _removeModalElements() {
    super._removeModalElements();
    this._componentRef.destroy();
  }

}
