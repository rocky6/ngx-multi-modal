# ngx-multi-modal - Angular 4 + Bootstrap 4 multi modal service
[![npm version](https://badge.fury.io/js/ngx-multi-modal.svg)](https://badge.fury.io/js/ngx-multi-modal)
[![Build Status](https://travis-ci.org/rocky6/ngx-multi-modal.svg?branch=master)](https://travis-ci.org/rocky6/ngx-multi-modal)
[![Coverage Status](https://coveralls.io/repos/github/rocky6/ngx-multi-modal/badge.svg?branch=master)](https://coveralls.io/github/rocky6/ngx-multi-modal?branch=master)
[![dependency Status](https://david-dm.org/rocky6/ngx-multi-modal/status.svg)](https://david-dm.org/rocky6/ngx-multi-modal)
[![devDependency Status](https://david-dm.org/rocky6/ngx-multi-modal/dev-status.svg?branch=master)](https://david-dm.org/rocky6/ngx-multi-modal#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/rocky6/ngx-multi-modal.svg)](https://greenkeeper.io/)

Forked from [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap)'s modal service.

## Demo

View all the directives in action at https://rocky6.github.io/ngx-multi-modal

## Dependencies
* [Angular 4+](https://angular.io)
* [Bootstrap 4+](https://getbootstrap.com/)
## Installation
Install above dependencies via *npm*. 

Now install `ngx-multi-modal` via:
```shell
npm install --save ngx-multi-modal
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-multi-modal`:
```js
map: {
  'ngx-multi-modal': 'node_modules/ngx-multi-modal/bundles/ngx-multi-modal.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { NgxMultiModalModule } from 'ngx-multi-modal';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` NgxMultiModalModule .forRoot()`):
```js
import { NgxMultiModalModule } from 'ngx-multi-modal';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgxMultiModalModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

In the root level you can specify base settings to all modals inside app providing them to forRoot method.
```js
import { NgxMultiModalModule } from 'ngx-multi-modal';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
    NgxMultiModalModule.forRoot(
      {
        backdrop: false, // Whether a backdrop element should be created for a given modal (true by default)
        container: '#modal_container', // CSS selector of an element to which to attach newly opened modal windows ('body' by default)
        size: 'lg', // Size of a new modal window.
        keyboard: false, // Whether to close the modal when escape key is pressed (true by default).
        windowClass: '' // Custom class to append to the modal window
      }
    )],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
``` 

Other modules in your application can simply import ` NgxMultiModalModule `:

```js
import { NgxMultiModalModule } from 'ngx-multi-modal';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgxMultiModalModule, ...], 
})
export class OtherModule {
}
```

## Example
For detailed usage examples see demo app code.

## Usage
To use modals you have to inject `NgxModalStack` service.
```js
constructor(public modalService: NgxModalStack);
```
Via `NgxModalStack` service you gain full control over Modal Stack.

You have three ways to open modal dialogs:
```js
/**
* data: string - plain string which will be shown inside modal
* options: NgxModalOptions (see NgxModalOptions interface for details)
*/
let ngxStringModal: StringModalRef = this.modalService.openFromString(data, this.options);

/**
* template - reference to ng-template
* context - template context, should be used inside ng-template via let-* syntax
* options: NgxModalOptions (see NgxModalOptions interface for details)
*/
let ngxTemplateModal: TemplateModalRef = this.modalService.openFromTemplate(template, context, this.options);
// Template context can be accessed via 
ngxTemplateModal.context;

/**
* TestModalComponent - component class (don't forget to register component inside ngModules entryComponents)
* options: NgxModalOptions (see NgxModalOptions interface for details)
*/
let ngxComponentModal: ComponentModalRef = this.modalService.openFromComponent(TestModalComponent, this.options);
// Component instance can be accessed via 
ngxComponentModal.instance;
```

## License

Copyright (c) 2017 rocky6. Licensed under the MIT License (MIT)

