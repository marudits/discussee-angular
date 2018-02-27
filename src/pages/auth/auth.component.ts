import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//components
import { HeaderComponent } from '../../components/header/header.component';

//utils
import { FirebaseService } from '../../utils/service/firebase.service';
import { SessionStorageService } from '../../utils/service/session-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

	mode: String = 'SIGN_IN';
	form = {
		email: null,
		password: null
	}
	validation = {
		email: {
			status: null,
			message: null
		},
		password: {
			status: null,
			message: null
		},
		submit: {
			status: null,
			message: null
		}
	}

	constructor(
		private fs: FirebaseService,
		private ss: SessionStorageService,
		private router: Router,
		private headerComp: HeaderComponent
		) { }

	ngOnInit() {
		if(this.fs.isAuthenticated()){
			this.router.navigate(['/'])
		}
	}

	handleSubmit(){
		switch (this.mode) {
			case "SIGN_IN":
				this.fs.signIn(this.form.email, this.form.password)
					.then(res => {
						if(res.status){
							this.headerComp.setUser(res.data);
							this.resetForm();
							this.router.navigate(['/']);
						} else {
							this.validation.submit = { status: 'invalid', message: res.data}
						}
					})
				break;
			case "SIGN_UP":
				this.fs.signUp(this.form.email, this.form.password)
					.then(res => {
						if(res.status){
							this.headerComp.setUser(res.data);
							this.resetForm();
							this.router.navigate(['/']);
						} else {
							this.validation.submit = { status: 'invalid', message: res.data}
						}
					})
				break;
			default:
				// code...
				break;
		}
	}

	toggleMode(){
		this.mode = this.mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN';
	}

	resetForm(){
		for(let key in this.form){
			this.form[key] = null;
		}

		this.resetValidation();
	}

	resetValidation(){
		for(let key in this.validation){
			this.validation[key].status = null;
			this.validation[key].message = null;
		}
	}

	validateForm(){
		this.resetValidation();

		let { email, password } = this.form;

		return true;
	}

}
