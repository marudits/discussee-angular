import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

//library
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//utils
import { getUsernameFromEmail } from '../helpers/stringManipulation';

@Injectable()
export class FirebaseService {
    private CURRENT_USER;

  	constructor(
  		private fireDb: AngularFireDatabase,
  		private fireAuth: AngularFireAuth,
  		private router: Router
  	) {
      fireAuth.authState.subscribe((user) => {
        console.log('CURRENT_USER: ', this.CURRENT_USER);
        this.CURRENT_USER = user;
      })
    }

  	getCurrentUser(){
  		return this.CURRENT_USER;
  	}

  	getThreadItem(threadId) {
  		return this.fireDb.object('todos/' + threadId).snapshotChanges().map(res => {
  			return {key: res.key, ...res.payload.val()}
  		})
  		.first()
  		.toPromise()
  		.then(res => {
  			return res
  		});
  	}

    // isAuthenticated(): Observable<boolean>{
    //   this.fireAuth.authState.subscribe((res) => {
    //     return res !== null
    //   })
    // }

  	isOwnerThread(threadId){
			this.getThreadItem(threadId)
				.then(res => {
					if(res.createdBy !== getUsernameFromEmail(this.getCurrentUser().email)){
						return false;
					}
					return true;
				})
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
