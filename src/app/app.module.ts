import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//library
import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';

//module
import { AppRoutingModule } from '../assets/routing';
import { ThreadModule } from '../pages/thread/thread.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    ThreadModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
