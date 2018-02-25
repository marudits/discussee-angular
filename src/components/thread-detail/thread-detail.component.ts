import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

//library
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {

	thread;
	commentList;
	threadId: String;
	form = {
		text: null
	};


	constructor(
  		private activatedRoute: ActivatedRoute,
  		private db: AngularFireDatabase,
		  private auth: AngularFireAuth
  	) { }

  	ngOnInit() {
  		this.activatedRoute.params.subscribe((params: Params) => {
  			this.setThreadItem(params.id)
  			this.getCommentList(params.id)
  			this.threadId = params.id;
      	});
  		
  	}

  	setThreadItem(id){
  		this.db.object('todos/' + id).snapshotChanges().map(res => {
  			return {key: res.key, ...res.payload.val()}
  		}).subscribe(item => {
  			this.thread = item;
  		});
  	}

  	getCommentList(id){
  		this.db.list('comments/' + id).snapshotChanges().map(actions => {
  			return actions ? actions.map(action => ({ key: action.key, ...action.payload.val() })) : [];
  		}).subscribe(items => {
  			this.commentList = items;
  		});
  	}

  	addComment(){
  		this.db.list('comments/' + this.threadId).push({
  			name: 'Anonymous',
  			text: this.form.text,
  			createdAt: Date.now()
  		})
  	}

}
