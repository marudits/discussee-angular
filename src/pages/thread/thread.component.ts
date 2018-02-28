import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//library
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-thread',
	templateUrl: './thread.component.html',
	styleUrls: ['./thread.component.scss']
})

export class ThreadComponent implements OnInit {
	
	dbComments;
  threadStatus = {
    ALL: 0,
    OPENED: 0,
    CLOSED: 0
  }

	constructor(
		private db: AngularFireDatabase,
		private auth: AngularFireAuth,
    private router: Router
  	) { }

  	ngOnInit() {
  		this.db.list('todos').snapshotChanges().map(actions => {
  			return actions.map(action => ({ key: action.key, ...action.payload.val() }));
  		}).subscribe(items => {
  			this.dbComments = items;
        this.threadStatus = {
          ALL: items.length,
          OPENED: items.filter(x => !x.isDone).length,
          CLOSED: items.filter(x => x.isDone).length
        }
  		});
  	}

    goto(url){
      this.router.navigate([url]);
    }

}
