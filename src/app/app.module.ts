import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//library
import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';
import { ThreadListComponent } from './thread-list/thread-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ThreadListComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
