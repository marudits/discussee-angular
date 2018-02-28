import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

//utils
import { FirebaseService } from '../../utils/service/firebase.service';
import { SessionStorageService } from '../../utils/service/session-storage.service';
import { getUsernameFromEmail } from '../../utils/helpers/stringManipulation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterContentChecked {
	title: String = 'Discussee';
	user: any;

	getUsernameFromEmail = getUsernameFromEmail;
	
	constructor(
		private router: Router,
		private fs: FirebaseService,
		private ss: SessionStorageService
		) { }

	ngOnInit() {
		this.user = this.ss.getData('CURRENT_USER');
	}

	ngAfterContentChecked(){
		this.user = this.ss.getData('CURRENT_USER');
	}

	isAuthenticated(){
		return this.fs.isAuthenticated();
	}

	goto(url){
		this.router.navigate([url])
	}

	setUser(user){
		this.user = user;
	}

	signOut(){
		this.fs.signOut();
	}

}
