/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import CardGenerator from './card/card-generator';
import 'es6-promise';
import 'isomorphic-fetch';

class App {
	constructor(title = 'Bingo game') {
		this.confUrl = 'http://localhost:9080/config.json';
		this.title = title;
		this.cardGenerator = new CardGenerator();
		this.loadConfigs(App.getConfig);
	}

	static getConfig(conf) {
		return conf;
	}

	loadConfigs(callback) {
		fetch(this.confUrl)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			}).then((config) => {
				callback(config);
		});

		return callback;
	}
}

export default App;
