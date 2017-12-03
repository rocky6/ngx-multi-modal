import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestModalComponent } from './test-modal/test-modal.component';
import { NgxMultiModalModule } from 'ngx-multi-modal';

@NgModule({
  declarations: [
    AppComponent,
    TestModalComponent
    ],
    imports: [
      BrowserModule,
      NgxMultiModalModule.forRoot({backdrop: true, container: 'body', size: 'lg'})
    ],
    providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TestModalComponent]
})
export class AppModule { }
