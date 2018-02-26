import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

//utils
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
  	private fs: FirebaseService,
  	private router: Router
  	) { }

  canActivate(){
    console.log('canActivate: ', this.fs.getCurrentUser());
  	if(!this.fs.getCurrentUser()){
  		this.router.navigate(['/auth'])
  	}
  	return true;
  }

}
