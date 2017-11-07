/**
 * Represent options available when opening new modal windows.
 */
import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';

export interface NgxModalOptions {

  /**
   * Function called when a modal will be dismissed.
   * If this function returns false, the modal is not dismissed.
   */
  beforeDismiss?: () => boolean;

  /**
   * Injector to use for modal content.
   */
  injector?: Injector;

  /**
   * provide custom factory resolver for components which are defined in lazy modules
   */
  factoryResolver?: ComponentFactoryResolver;

  /**
   * Whether to close the modal when escape key is pressed (true by default).
   */
  keyboard?: boolean;

  /**
   * Custom class to append to the modal window
   */
  dismissOnBackdropClick?: boolean;

  /**
   * Size of a new modal window.
   */
  size?: 'sm' | 'lg';

  /**
   * Custom class to append to the modal window
   */
  windowClass?: string;

}
