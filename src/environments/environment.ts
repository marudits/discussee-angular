// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  LIBRARY: {
  	FIREBASE: {
  		CONFIG: {
  			apiKey: "AIzaSyBqhxzgYP1JEZTNpgd2nPoXwnOWh1-CTec",
			authDomain: "todo-apps-980c4.firebaseapp.com",
			databaseURL: "https://todo-apps-980c4.firebaseio.com",
			projectId: "todo-apps-980c4",
			storageBucket: "todo-apps-980c4.appspot.com",
			messagingSenderId: "998029269939"
		} 
  	}
  }
};
