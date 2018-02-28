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
import { SessionStorageService } from './session-storage.service';

@Injectable()
export class FirebaseService {
    private CURRENT_USER;

  	constructor(
  		private fireDb: AngularFireDatabase,
  		private fireAuth: AngularFireAuth,
      private ss: SessionStorageService,
  		private router: Router
  	) {
      this.fireAuth.authState.subscribe((user) => {
        this.CURRENT_USER = user;
        if(user){
          this.ss.setData('CURRENT_USER', user);
        }
      })
    }

  	getCurrentUser(){
  		return this.ss.getData('CURRENT_USER');
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

    isAuthenticated(){
      return typeof this.ss.getData('CURRENT_USER') !== 'undefined';
    }

    isTypingComment(id, text){
      let CURRENT_USER = this.ss.getData('CURRENT_USER');
      this.fireDb.object('isTyping/' + id + '/' + getUsernameFromEmail(CURRENT_USER.email))
        .set(text)
    }

    isFinishedTypingComment(id){
      let CURRENT_USER = this.ss.getData('CURRENT_USER');
      this.fireDb.object('isTyping/' + id + '/' + getUsernameFromEmail(CURRENT_USER.email))
        .remove()
    }

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

    signOut(){
      this.fireAuth.auth.signOut()
        .then(() => {
          this.ss.clearData();
          this.router.navigate(['/auth'])
        })
    }

}
