import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	title: String = 'Discussee';
	user: any = null;

	constructor(
		private router: Router) { }

	ngOnInit() {

	}

	setUser(user){
		console.log('this.user: ', this.user, '| user: ', user, '| email: ', user.email);
		this.user = user;
		console.log('new: ', this.user);
	}

}
