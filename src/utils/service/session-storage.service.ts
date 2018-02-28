import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {
	data: any = {};

	constructor() { }

	clearData(){
		sessionStorage.clear();
		this.data = {};
	}

	getData(key){
		let data  = JSON.parse(sessionStorage.getItem('data'));

		if(data){
			this.data = data;
		}

		return this.data ? this.data[key] : null
	}

	setData(key: string, val){
		this.data[key] = val;
		sessionStorage.setItem('data', JSON.stringify(this.data))
	}

}
