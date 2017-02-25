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
import WinPatternsAnimModule from './winning/win-patterns-anim-module';

class App {
	constructor() {
		this.confUrl = ApiConsts.CONF;
		this.loadConfigs(App.init);
	}

	loadConfigs(callback) {
		fetch(this.confUrl).then((response) => {
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
			const purchasedCardsCount = MarketCards.getPurchasedCardsCount(marketCards.getRadioButtonsArray());
			const cardDrawer = new CardDrawer(
				this.cardGen.generateCards(purchasedCardsCount),
				document.querySelector('#leftGameScreen')
			);
			MarketCards.buyCards(purchasedCardsCount, conf.gameConf.cardPrice);
		}
	}

	start(conf) {
		this.title = conf.gameConf.appTitle;
		document.querySelector('title').innerText = conf.gameConf.appTitle;
		const elMarketPlace = document.querySelector('#marketPlace');

		// Create the components only if they are allowed in the config
		if (conf.gameConf.winningDialog) {
			const winningDialog = new WinningDialog('#winningDialogContainer');
		}

		if (!conf.gameConf.marketCards) {
			ViewManipulator.toggleVisibility(elMarketPlace, false);
		}
		MarketCards.setCardPrices(conf.gameConf.cardPrice, document.querySelectorAll('.cards'));

		let elWinPatternsAnimModule = null;
		if (conf.gameConf.winPatternsAnimModule) {
			elWinPatternsAnimModule = document.querySelector('#winPatternsAnimModule');
			const horPattern = new WinPatternsAnimModule(elWinPatternsAnimModule.querySelector('#horizontal'), 5, 5, 'horizontal');
			const verPattern = new WinPatternsAnimModule(elWinPatternsAnimModule.querySelector('#vertical'), 5, 5, 'vertical');
			const diagPattern = new WinPatternsAnimModule(elWinPatternsAnimModule.querySelector('#diagonal'), 5, 5, 'diagonal');
		}

		if (conf.gameConf.mainGame) {
			const timer = new Timer(
				document.querySelector('#timerContainer'),
				conf.gameConf.beforeStartGameSeconds,
				EventsConsts.START_GAME, true
			);

			document.addEventListener(EventsConsts.ENOUGH_BALANCE, () => {
				ViewManipulator.toggleVisibility(elMarketPlace, false);
				ViewManipulator.toggleVisibility(document.querySelector('#footer'), false);
				timer.pulsate();
			});

			const startBtn = document.querySelector('#startBtn');
			if (startBtn) {
				startBtn.addEventListener('click', (e) => {
					this.initPlayingCards(conf, elMarketPlace);
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
