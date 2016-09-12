/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import CardGenerator from './card/card-generator';
import CardDrawer from './card/card-drawer';
import 'es6-promise';
import 'isomorphic-fetch';

class App {

	constructor(title = 'Bingo game') {
		this.confUrl = 'http://localhost:8000/config.json';
		this.title = title;
		this.loadConfigs(this.init);
	}

	loadConfigs(callback) {
		fetch(this.confUrl)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			}).then((config) => {
			callback(this, config);
		});

		return callback;
	}

	init(context, conf) {
		context.start(conf);
	}

	start(conf) {
		/*this.cardGen = new CardGenerator(conf);
		this.cardDrawer = new CardDrawer();
		this.cardDrawer.draw(this.cardGen.generateCards());*/
		document.getElementById('startBtn').addEventListener('click', (e) => {
			this.cardGen = new CardGenerator(conf);
			this.cardDrawer = new CardDrawer();
			this.cardDrawer.draw(this.cardGen.generateCards());
		});
	}
}

export default App;

(() => {
	let app = new App();
	//document.addEventListener('DOMContentLoaded', () => {});
})();
