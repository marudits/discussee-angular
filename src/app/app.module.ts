import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//env
import { environment } from '../environments/environment';

//library
import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';
import { AngularFireLite } from 'angularfire-lite';

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
    AppRoutingModule,
    AngularFireLite.forRoot(environment.LIBRARY.FIREBASE.CONFIG)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
