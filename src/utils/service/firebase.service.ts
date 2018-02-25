import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

//library
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseService {

  	constructor(
  		private fireDb: AngularFireDatabase,
  		private fireAuth: AngularFireAuth,
  	) { }

  	getCurrentUser(){
  		return this.fireAuth.auth.currentUser;
  	}

  	signIn(email, password): Promise<any> {
  		return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
  			.then((res) => {
  				return {status: true, data: res}
  			})
  			.catch(err => {
  				return {status: false, data: err}
  			})
  	}

  	signUp(email, password): Promise<any>{
  		return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
  			.then(res => {
  				return { status: true, data: res }
  			})
  			.catch(err => {
  				return { status: false, data: err}
  			})
  	}

}
