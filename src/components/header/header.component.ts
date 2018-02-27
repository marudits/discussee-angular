import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//utils
import { FirebaseService } from '../../utils/service/firebase.service';
import { getUsernameFromEmail } from '../../utils/helpers/stringManipulation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
	title: String = 'Discussee';
	user: any;

	getUsernameFromEmail = getUsernameFromEmail;
	
	constructor(
		private router: Router,
		private fs: FirebaseService
		) { }

	ngOnInit() {
		this.user = this.fs.getCurrentUser();
	}

	isAuthenticated(){
		return this.fs.isAuthenticated();
	}

	goto(url){
		this.router.navigate([url])
	}

	setUser(user){
		this.user = user;
		console.log('setUser: ', this.user);
	}

	signOut(){
		this.fs.signOut();
	}

}
