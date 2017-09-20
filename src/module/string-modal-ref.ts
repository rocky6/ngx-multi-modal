import {
  Injectable, Injector,
  ApplicationRef, ComponentFactory
} from '@angular/core';

import {NgxModalRef } from './modal-ref';
import { NgxModalWindow } from './modal-window';
import { NgxModalOptions } from './ngx-modal-options';
import { NgxModalGlobalOptions } from './ngx-modal-global-options';


export class StringModalRef extends NgxModalRef {

  constructor(
    // Get view, component or node array to push into ng-content of Modal
    data: string,
    _options: NgxModalOptions,
    _injector: Injector,
    _applicationRef: ApplicationRef,
    _windowFactory: ComponentFactory<NgxModalWindow>,
    _globalOptions: NgxModalGlobalOptions
  ) {

    // Load injectors and factories
    super(_options, _injector, _applicationRef, _windowFactory, _globalOptions);

    // Set-Up context and nodes
    this._nodes = [[document.createTextNode(`${data}`)]];
    this._context = null;

    // Init modal
    this.init();

  }

}
