import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Discussee';
  constructor(
  	private router: Router
  	){

  }
  
  goto(url){
  	this.router.navigate([url]);
  }
}
