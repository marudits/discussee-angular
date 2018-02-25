import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//library
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//utils
import { calculateDiffTime } from '../../utils/helpers/stringManipulation';

@Component({
  selector: 'thread-item',
  templateUrl: './thread-item.component.html',
  styleUrls: ['./thread-item.component.scss']
})
export class ThreadItemComponent implements OnInit {

	@Input() thread: Object;
	@Input() key: String;

	calculateDiffTime = calculateDiffTime;

	constructor(
		private router: Router,
		private db: AngularFireDatabase,
		private auth: AngularFireAuth
		) { }

	ngOnInit() {
	}

	goto(url){
		this.router.navigateByUrl(url);
	}

	deleteThread(threadId){
		this.db.object('todos/' + threadId)
  			.remove();
	}

}
