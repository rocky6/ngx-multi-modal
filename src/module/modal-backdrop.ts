import { Component, HostBinding } from '@angular/core';

@Component({selector: 'ngx-multi-modal-backdrop', template: '', host: {'class': 'modal-backdrop fade show'}}) // tslint:disable-line
export class NgxModalBackdrop { // tslint:disable-line
  @HostBinding('style.z-index') zIndex: string;
}
