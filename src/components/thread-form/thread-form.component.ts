import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//assets
import { CONFIG } from '../../assets/config';
import { LABEL } from '../../assets/label';

//library
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//utils
import { getUsernameFromEmail } from '../../utils/helpers/stringManipulation';
import { SessionStorageService } from '../../utils/service/session-storage.service';

@Component({
  selector: 'app-thread-form',
  templateUrl: './thread-form.component.html',
  styleUrls: ['./thread-form.component.scss']
})
export class ThreadFormComponent implements OnInit {

  CONFIG = CONFIG;
  LABEL = LABEL;

	form = {
		title: null,
		desc: null
	}
	mode: String = 'ADD';
	thread;
  validation = {
    title: {
      status: null,
      message: null
    },
    desc: {
      status: null,
      message: null
    }
  }

	constructor(
		private db: AngularFireDatabase,
		private auth: AngularFireAuth,
		private activatedRoute: ActivatedRoute,
		private router: Router,
    private ss: SessionStorageService
  	) { }

  ngOnInit() {
  	if(this.router.url.match(/^\/update\/-.*/)){
  		this.getThreadItem();
      this.mode = 'UPDATE';
  	}
  }

  addThread(){
  	const CURRENT_USER = getUsernameFromEmail(this.ss.getData('CURRENT_USER').email);

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
    if(this.validateForm()){
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

  resetForm(){
    this.form = {
      title: null,
      desc: null
    }
  }

  resetValidation(){
    for(let key in this.validation){
      this.validation[key].status = null;
      this.validation[key].message = null;
    }
  }

  updateThread(){
  	const CURRENT_USERNAME = getUsernameFromEmail(this.ss.getData('CURRENT_USER').email);
    
  	this.db.object('todos/' + this.thread.key)
  		.update(Object.assign(
  			{}, 
  			this.thread, 
  			{ title: this.form.title },
  			{ desc: this.form.desc },
  			{ updatedBy: CURRENT_USERNAME }, 
  			{ updatedAt: Date.now() }
  		));

  	this.router.navigate(['/'])
  }

  validateForm(){
    this.resetValidation();

    let { title, desc } = this.form;

    //validate title
    if(!title || title.trim().length <= 0){
      this.validation.title.status = 'invalid';
      this.validation.title.message = LABEL.VALIDATION.COMMON.MESSAGE.REQUIRED;
      return false;
    } else {
      this.validation.title.status = 'valid';
      this.validation.title.message = null;
    }

    //validate desc
    if(!desc || desc.trim().length <= 0){
      this.validation.desc.status = 'invalid';
      this.validation.desc.message = LABEL.VALIDATION.COMMON.MESSAGE.NOT_EMPTY;
      return false;
    } else if(desc.trim().length < CONFIG.VALIDATION.THREAD.DESC.MIN_LENGTH){
      let diff = CONFIG.VALIDATION.THREAD.DESC.MIN_LENGTH - desc.trim().length;
      this.validation.desc.status = 'invalid';
      this.validation.desc.message = `${LABEL.VALIDATION.THREAD.DESC.MIN_LENGTH}. ${diff} characters remain.`;
      return false;
    } else {
      this.validation.desc.status = 'valid';
      this.validation.desc.message = null;
    }

    return true;
  }

}
