/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import CardGenerator from './card/card-generator';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App {
	constructor(title = 'Bingo game') {
		this.title = title;
		this.cardGenerator = new CardGenerator();
		this.loadConfigs(this.getConfig);
	}

	getConfig(conf) {
		console.log('>>> conf: ', conf);
		return conf;
	}

	loadConfigs(callback) {
		fetch('http://localhost:9080/config.json')
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
