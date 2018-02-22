import { Component, OnInit } from '@angular/core';
import { AngularFireLiteAuth, AngularFireLiteDatabase, AngularFireLiteFirestore } from 'angularfire-lite';

@Component({
	selector: 'app-thread',
	templateUrl: './thread.component.html',
	styleUrls: ['./thread.component.css']
})

export class ThreadComponent implements OnInit {
	
	constructor(
		private db: AngularFireLiteDatabase,
		private auth: AngularFireLiteAuth,
		private firestore: AngularFireLiteFirestore
  	) { }

  	dbComments

  	ngOnInit() {
  		this.db.read('todos').subscribe((data) => {
  			console.log('data: ', data);
  			this.dbComments = data;
  		});
  	}

}
