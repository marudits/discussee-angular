import * as moment from 'moment';

export function calculateDiffTime(timestamp = Date.now()): any {
	// let diffTime = (moment(new Date()) - moment(new Date(timestamp))),
	let diffTime = new Date().getTime() - timestamp,
		sentTime = new Date(timestamp);

	let countDays =  moment.utc(diffTime).dayOfYear() - 1,
		countHours = moment.utc(diffTime).hour(),
		countMinutes = moment.utc(diffTime).minute(),
		countSeconds = moment.utc(diffTime).second();

	if(countDays > 1){
		return moment(sentTime).format('D/MM/YY').toString();
	} else if(countDays === 1){
		return `Yesterday ${moment(sentTime).format('HH:mm').toString()}`;
	} else {
		if(countHours >= 1){
			return `${countHours}h ago`;
		} else if(countMinutes >= 1) {
			return `${countMinutes}m ago`;
		} else {
			return `${countSeconds}s ago`;
		}
    }
}

export function getUsernameFromEmail(email){
	return email.slice(0, email.indexOf('@'))
}