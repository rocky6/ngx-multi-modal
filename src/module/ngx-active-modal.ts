import { Injectable } from '@angular/core';

/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
@Injectable()
export class NgxActiveModal {
  /**
   * Can be used to close a modal, passing an optional result.
   */
  close(result?: any): void {}

  /**
   * Can be used to dismiss a modal, passing an optional reason.
   */
  dismiss(reason?: any): void {}
}
