import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, CanActivate } from '@angular/router';

//utils
import { FirebaseService } from './firebase.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(
  	private fs: FirebaseService,
  	private router: Router,
  	private activatedRoute: ActivatedRoute
  	) { }

  canActivate(){
  	let threadId = this.activatedRoute.params.subscribe((params: Params) => {
  		return params.id
  	});
  	if(!this.fs.getCurrentUser()){
  		this.router.navigate(['/auth']);
  		return false;
  	} else if(!this.fs.isOwnerThread(threadId)){
  		this.router.navigate(['/'])
  		return false;
  	} else {
  		return true;
  	}
  }
}
