import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//library
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-thread-form',
  templateUrl: './thread-form.component.html',
  styleUrls: ['./thread-form.component.css']
})
export class ThreadFormComponent implements OnInit {

	form = {
		title: null,
		desc: null
	}

	mode: String = 'ADD';

	thread;

	constructor(
		private db: AngularFireDatabase,
		private auth: AngularFireAuth,
		private activatedRoute: ActivatedRoute,
		private router: Router
  	) { }

  ngOnInit() {
  	if(this.router.url.match(/^\/update\/-.*/)){
  		this.getThreadItem();
  	}
  }

  addThread(){
  	const CURRENT_USER = 'marudits';

  	this.db.list('todos/').push({
  		title: this.form.title,
		desc: this.form.desc,
		isEditing: false,
		isDone: false,
		createdAt: Date.now(),
		createdBy: CURRENT_USER,
		updatedAt: Date.now(),
		updatedBy: CURRENT_USER
	})

	this.router.navigate(['/']);
  }

  handleSubmit(){
  	switch (this.mode) {
  		case "ADD":
  			this.addThread();
  			break;
  		case "UPDATE":
  			this.updateThread();
  			break
  		default:
  			break;
  	}
  }

  getThreadId(){
  	
  }

  getThreadItem(){
  	this.activatedRoute.params.subscribe((params: Params) => {
  		this.db.object('todos/' + params.id).snapshotChanges().map(res => {
			return {key: res.key, ...res.payload.val()}
		}).subscribe(item => {
			this.thread = item;
			this.form = {
				title: item.title,
				desc: item.desc
			}
		});
  	});
  	
  }

  updateThread(){
  	const CURRENT_USER = 'marudits';
  	this.db.object('todos/' + this.thread.id)
  		.update(Object.assign(
  			{}, 
  			this.thread, 
  			{ title: this.form.title },
  			{ desc: this.form.desc },
  			{ updatedBy: CURRENT_USER }, 
  			{ updatedAt: Date.now() }
  		));

  	this.router.navigate(['/'])
  }

}
