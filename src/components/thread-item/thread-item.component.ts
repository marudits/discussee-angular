import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//library
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//utils
import { calculateDiffTime, getUsernameFromEmail } from '../../utils/helpers/stringManipulation';
import { SessionStorageService } from '../../utils/service/session-storage.service';

@Component({
  selector: 'thread-item',
  templateUrl: './thread-item.component.html',
  styleUrls: ['./thread-item.component.scss']
})
export class ThreadItemComponent implements OnInit {

	@Input() thread;
	@Input() key: String;

	commentList = [];
	calculateDiffTime = calculateDiffTime;

	constructor(
		private router: Router,
		private db: AngularFireDatabase,
		private auth: AngularFireAuth,
		private ss: SessionStorageService
		) { }

	ngOnInit() {
		this.getCommentList(this.thread.key)
	}

	goto(url){
		this.router.navigateByUrl(url);
	}

	deleteThread(threadId){
		const THREAD_TITLE = this.thread.title;
		this.db.object('todos/' + threadId)
  			.remove();
  		window.alert('Thread ' + THREAD_TITLE + ' is successfully deleted');
	}

	getCommentList(id){
		this.db.list('comments/' + id).snapshotChanges().map(actions => {
			return actions ? actions.map(action => ({ key: action.key, ...action.payload.val() })) : [];
		}).subscribe(items => {
			this.commentList = items;
		});
	}

	isOwnThread(){
		let CURRENT_USERNAME = getUsernameFromEmail(this.ss.getData('CURRENT_USER').email);
		return CURRENT_USERNAME === this.thread.createdBy
	}

	toggleStatus(){
		this.db.object('todos/' + this.thread.key).update({
			isDone: !this.thread.isDone,
			udpatedAt: Date.now(),
			updatedBy: getUsernameFromEmail(this.ss.getData('CURRENT_USER').email)
		});
	}

}
