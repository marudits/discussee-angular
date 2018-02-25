import { CONFIG } from './config';

export const LABEL = {
	VALIDATION: {
		COMMON: {
			MESSAGE: {
				REQUIRED: "This field is required",
				NOT_EMPTY: "This field shouldn't be empty",
				FORMAT: "Your input isn't at correct format"
			}
		},
		THREAD: {
			DESC: {
				MIN_LENGTH: `Minimum ${CONFIG.VALIDATION.THREAD.DESC.MIN_LENGTH} characters`
			}
		}
	}
}