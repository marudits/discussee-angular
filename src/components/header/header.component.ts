import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//utils
import { FirebaseService } from '../../utils/service/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	title: String = 'Discussee';
	user: any = null;

	constructor(
		private router: Router,
		private fs: FirebaseService
		) { }

	ngOnInit() {

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
