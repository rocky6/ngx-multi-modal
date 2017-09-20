import { isNullOrUndefined } from './util';
import { NgxModalOptions } from './ngx-modal-options';


export interface INgxModalGlobalOptions {

  /**
   * Whether a backdrop element should be created for a given modal (true by default).
   * Alternatively, specify 'static' for a backdrop which doesn't close the modal on click.
   */
  backdrop?: boolean;

  /**
   * An element to which to attach newly opened modal windows.
   */
  container?: string;
}


export class NgxModalGlobalOptions implements INgxModalGlobalOptions, NgxModalOptions {

  backdrop = true;
  container = 'body';
  keyboard?: boolean;
  size?: 'sm' | 'lg';
  windowClass?: string;

  constructor (options?: INgxModalGlobalOptions & NgxModalOptions) {

    if (options) {
      if (!isNullOrUndefined(options.backdrop)) {
        this.backdrop = options.backdrop;
      }

      if (!isNullOrUndefined(options.container)) {
        this.container = options.container;
      }

      if (!isNullOrUndefined(options.keyboard)) {
        this.keyboard = options.keyboard;
      }

      if (!isNullOrUndefined(options.size)) {
        this.size = options.size;
      }

      if (!isNullOrUndefined(options.windowClass)) {
        this.windowClass = options.windowClass;
      }

    }
  }

}
