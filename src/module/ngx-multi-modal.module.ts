import { NgModule, ModuleWithProviders, InjectionToken, Optional } from '@angular/core';

import {NgxModalBackdrop} from './modal-backdrop';
import {NgxModalWindow} from './modal-window';
import {NgxModalStack} from './modal-stack';
import { INgxModalGlobalOptions, NgxModalGlobalOptions } from './ngx-modal-global-options';
import { NgxModalOptions } from './ngx-modal-options';

export { NgxModalRef } from './modal-ref';
export { StringModalRef } from './string-modal-ref';
export { ComponentModalRef } from './component-modal-ref';
export { TemplateModalRef } from './template-modal-ref';
export { INgxModalGlobalOptions } from './ngx-modal-global-options';
export { NgxModalOptions } from './ngx-modal-options';
export { NgxModalStack, INgxActiveModal} from './modal-stack';
export { NgxActiveModal } from './ngx-active-modal';
export { ModalDismissReasons } from './modal-dismiss-reasons';

const Options = new InjectionToken<INgxModalGlobalOptions & NgxModalOptions>('options');

export function getOptions(options: INgxModalGlobalOptions & NgxModalOptions) {
  return new NgxModalGlobalOptions(options);
}

@NgModule({
  declarations: [NgxModalBackdrop, NgxModalWindow],
  entryComponents: [NgxModalBackdrop, NgxModalWindow],
  providers: []
})
export class NgxMultiModalModule {
  static forRoot(options?: INgxModalGlobalOptions & NgxModalOptions): ModuleWithProviders {
    return {
      ngModule: NgxMultiModalModule,
      providers: [
        NgxModalStack,
        {provide: Options, useValue: options},
        {provide: NgxModalGlobalOptions, useFactory: getOptions, deps: [[Options]]}
      ]
    };
  }
}
