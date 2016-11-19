/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import ApiController from './api/api-controller';
import ViewManipulator from './utils/view-manipulator';
import CardGenerator from './card/card-generator';
import CardDrawer from './card/card-drawer';
import MarketCards from './market-place/market-cards';
import Blower from './blower/blower';
import Dauber from './dauber/dauber';
import Timer from './utils/timer';
import { EventsConsts } from './events/events-consts';
import WinningDialog from './winning/winning-dialog';
import 'es6-promise';
import 'isomorphic-fetch';
import { ApiConsts } from './api/api-consts';

class App {

	constructor(title = 'Bingo game') {
		this.confUrl = ApiConsts.CONF;
		this.title = title;
		this.loadConfigs(App.init);
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

	static init(context, conf) {
		context.start(conf);
	}

	initPlayingCards(conf, container) {
		if (conf.gameConf.playingCards) {
			this.cardGen = new CardGenerator(conf);
			const marketCards = new MarketCards(container);
			const cardDrawer = new CardDrawer(
				this.cardGen.generateCards(marketCards.getPurchasedCardsCount()),
				document.querySelector('#cardsContainer')
			);
		}
	}

	start(conf) {
		const elMarketPlace = document.querySelector('#marketPlace');
		this.initPlayingCards(conf, elMarketPlace);

		if (conf.gameConf.winningDialog) {
			const winningDialog = new WinningDialog('#winningDialogContainer');
		}

		// Create the components only if they are allowed in the config
		if (!conf.gameConf.marketCards) {
			ViewManipulator.toggleVisibility(elMarketPlace, false);
		}

		if (conf.gameConf.mainGame) {
			const timer = new Timer(
				document.querySelector('#timerContainer'),
				conf.gameConf.beforeStartGameSeconds,
				EventsConsts.START_GAME, true
			);

			const startBtn = document.querySelector('#startBtn');
			if (startBtn) {
				startBtn.addEventListener('click', (e) => {
					console.log('>>> Start Game!');
					ViewManipulator.toggleVisibility(elMarketPlace, false);
					ViewManipulator.toggleVisibility(document.querySelector('#footer'), false);
					this.initPlayingCards(conf, elMarketPlace);
					timer.pulsate();
				});
			}
		}

		if (conf.gameConf.dauber) {
			const dauber = new Dauber(conf, document.querySelector('#tube'));
			const blower = new Blower(document.querySelector('#blower-balloon'));
		}

		const apiCtrl = new ApiController();
		const logoutBtn = document.querySelector('#logoutBtn');
		if (logoutBtn) {
			logoutBtn.addEventListener('click', (e) => {
				apiCtrl.logout();
			});
		}

		if (ApiController.isLogged()) {
			ViewManipulator.showUserInfo();
		}
	}
}

export default App;

(() => {
	const app = new App();
})();
