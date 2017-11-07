import {
  Component,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  AfterViewInit,
  OnDestroy, HostBinding
} from '@angular/core';

import {ModalDismissReasons} from './modal-dismiss-reasons';

@Component({
  selector: 'ngx-multi-modal-window',
  host: { // tslint:disable-line
    '[class]': '"modal fade show" + (windowClass ? " " + windowClass : "")',
    'role': 'dialog',
    'tabindex': '-1',
    'style': 'display: block;',
    '(keyup.esc)': 'escKey($event)',
    '(click)': 'backdropClick($event)'
  },
  template: `
    <div [class]="'modal-dialog' + (size ? ' modal-' + size : '')" role="document">
        <div class="modal-content"><ng-content></ng-content></div>
    </div>
    `
})
export class NgxModalWindow implements OnInit, // tslint:disable-line
    AfterViewInit, OnDestroy {
  private _elWithFocus: Element;  // element that is focused prior to modal opening

  @Input() backdrop: boolean | string = true;
  @Input() keyboard = true;
  @Input() dismissOnBackdropClick = true;
  @Input() size: string;
  @Input() windowClass: string;

  @HostBinding('style.z-index') zIndex: string;

  @Output('dismiss') dismissEvent = new EventEmitter(); // tslint:disable-line

  constructor(private _elRef: ElementRef, private _renderer: Renderer2) {}

  backdropClick($event: any): void {
    if (this.dismissOnBackdropClick && this.backdrop === true && this._elRef.nativeElement === $event.target) {
      this.dismiss(ModalDismissReasons.BACKDROP_CLICK);
    }
  }

  escKey($event: any): void {
    if (this.keyboard && !$event.defaultPrevented) {
      this.dismiss(ModalDismissReasons.ESC);
    }
  }

  dismiss(reason: any): void { this.dismissEvent.emit(reason); }

  ngOnInit() {
    this._elWithFocus = document.activeElement;
    this._renderer.addClass(document.body, 'modal-open');
  }

  ngAfterViewInit() {
    if (!this._elRef.nativeElement.contains(document.activeElement)) {
      this._elRef.nativeElement['focus'].apply(this._elRef.nativeElement, []);
    }
  }

  ngOnDestroy() {
    const body = document.body;
    const elWithFocus = this._elWithFocus;

    let elementToFocus;
    if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
      elementToFocus = elWithFocus;
    } else {
      elementToFocus = body;
    }
    elementToFocus['focus'].apply(elementToFocus, []);

    this._elWithFocus = null;
    this._renderer.removeClass(body, 'modal-open');
  }
}
