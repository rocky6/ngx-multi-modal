# ngx-multi-modal - Angular 4 + Bootstrap 4 multi modal service

[![npm version](https://badge.fury.io/js/ngx-multi-modal.svg)](https://badge.fury.io/js/ngx-multi-modal)
[![Build Status](https://travis-ci.org/rocky6/ngx-multi-modal.svg?branch=master)](https://travis-ci.org/rocky6/ngx-multi-modal)
[![Coverage Status](https://coveralls.io/repos/github/rocky6/ngx-multi-modal/badge.svg?branch=master)](https://coveralls.io/github/rocky6/ngx-multi-modal?branch=master)
[![dependency Status](https://david-dm.org/rocky6/ngx-multi-modal/status.svg)](https://david-dm.org/rocky6/ngx-multi-modal)
[![devDependency Status](https://david-dm.org/rocky6/ngx-multi-modal/dev-status.svg?branch=master)](https://david-dm.org/rocky6/ngx-multi-modal#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/rocky6/ngx-multi-modal.svg)](https://greenkeeper.io/)

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

## Usage



## License

Copyright (c) 2017 rocky6. Licensed under the MIT License (MIT)

