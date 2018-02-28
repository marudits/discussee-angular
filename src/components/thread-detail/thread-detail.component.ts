import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

//library
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//utils
import { FirebaseService } from '../../utils/service/firebase.service';
import { getUsernameFromEmail, calculateDiffTime } from '../../utils/helpers/stringManipulation';

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
  isTypingTimer = null;
  isTypingInfo = null;

  calculateDiffTime = calculateDiffTime;

	constructor(
  		private activatedRoute: ActivatedRoute,
  		private db: AngularFireDatabase,
		  private auth: AngularFireAuth,
      private fs: FirebaseService
  	) { }

  	ngOnInit() {
  		this.activatedRoute.params.subscribe((params: Params) => {
  			this.setThreadItem(params.id)
  			this.getCommentList(params.id)
  			this.threadId = params.id;
      	});
  		
      this.formatIsTypingInfo();
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
        this.scrollComment();
  		});
  	}

    formatIsTypingInfo(){
      this.db.list('isTyping/' + this.threadId).snapshotChanges().map(actions => {
        return actions ? actions.map(action => ({ key: action.key, ...action.payload.val() })) : [];
      }).subscribe(items => {
        if(items && items.length > 0){
          const CURRENT_USERNAME = getUsernameFromEmail(this.fs.getCurrentUser().email)
          let commentList = items;
          
          let isCurrentUserTyping = commentList.filter(x => (x.key === CURRENT_USERNAME)).length === 1,
            otherUserTyping = commentList.filter(x => (x.key !== CURRENT_USERNAME)),
            totalIsTyping = commentList.length;

          if(commentList.length === 1){
            this.isTypingInfo = `${isCurrentUserTyping ? 'You are' : commentList[0].key + ' is'} typing...`
          } else {
            if(isCurrentUserTyping){
              this.isTypingInfo = `You and ${otherUserTyping.length > 1 ? otherUserTyping.length + ' people' : otherUserTyping[0].key} are typing...`
            } else {
              this.isTypingInfo = `${otherUserTyping[0].key} and ${otherUserTyping.length > 2 ? otherUserTyping.length + ' people' : otherUserTyping[1].key} are typing...`
            }
          }
        } else {
          this.isTypingInfo = null;
        }
      })
    }

    handleChange(e){
      if(e.target.value){
        this.resetIsTypingTimer(this.thread.key);

        this.fs.isTypingComment(this.thread.key, e.target.value)
      }
    }

    resetIsTypingTimer(id){
      if(this.isTypingTimer){
        clearTimeout(this.isTypingTimer)
        this.isTypingTimer = null;
      }

      let that = this;
      this.isTypingTimer = setTimeout(() => {
        that.stoppedTyping(id)
      }, 5000)
    }

    stoppedTyping(id){
      if(this.isTypingTimer){
        this.isTypingTimer = null;
        this.fs.isFinishedTypingComment(id);
      }
    }

  	addComment(){
      const CURRENT_USER = this.fs.getCurrentUser();

  		this.db.list('comments/' + this.threadId).push({
  			name: getUsernameFromEmail(CURRENT_USER.email),
  			text: this.form.text,
  			timestamp: Date.now()
  		});

      this.resetForm();
      this.stoppedTyping(this.thread.key);
      this.scrollComment();
  	}

    isOwnComment(name){
      return getUsernameFromEmail(this.fs.getCurrentUser().email) === name
    }

    resetForm(){
      this.form.text = null;
    }

    scrollComment(){
      let commentList = document.getElementById('comment-list');
      if(commentList){
        commentList.scrollTop = commentList.scrollHeight + 1000;
      }
    }

}
