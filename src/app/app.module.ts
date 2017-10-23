import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppDialogModule} from "./dialog/dialog.module";
import {AppDialogService} from "./dialog/dialog.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppDialogModule.forRoot({
      confirmText: '确定',
      cancelText: '取消',
      backdrop: false
    })
  ],
  providers: [
    AppDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
