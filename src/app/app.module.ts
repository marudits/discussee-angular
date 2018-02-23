import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//env
import { environment } from '../environments/environment';

//library
// import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

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
    AngularFireModule.initializeApp(environment.LIBRARY.FIREBASE.CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
