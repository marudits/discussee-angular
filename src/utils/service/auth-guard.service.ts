import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

//utils
import { FirebaseService } from './firebase.service';
import { SessionStorageService } from './session-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
  	private fs: FirebaseService,
    private ss: SessionStorageService,
  	private router: Router
  	) { }

  canActivate(route, state){
    if(!this.ss.getData('CURRENT_USER')){
    	this.router.navigate(['/auth']);
      return false;
  	}
    
    return true;
  }

}
