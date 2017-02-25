/**
 * Created by Mihail on 2/25/2017.
 */
'use strict';

import ApiController from '../api/api-controller';
import ViewManipulator from '../utils/view-manipulator';
import CardGenerator from '../card/card-generator';
import CardDrawer from '../card/card-drawer';
import MarketCards from '../market-place/market-cards';
import Blower from '../blower/blower';
import Dauber from '../dauber/dauber';
import Timer from '../utils/timer';
import { EventsConsts } from '../events/events-consts';
import WinningDialog from '../winning/winning-dialog';
import WinPatternsAnimModule from '../winning/win-patterns-anim-module';

class Initializer {
  constructor(conf) {
    this.setTitle(conf.gameConf.appTitle);
    this.addWinningDialog(conf);
    const elMarketPlace = this.addMarketPlace(conf);
    this.setCardPrices(conf);
    this.addWinPatternAnimModule(conf);
    this.startGame(conf, elMarketPlace);
    this.addDauber(conf);
    this.addLogoutBtn();
    this.showUserInfo();
  }

  addWinningDialog(conf) {
    if (conf.gameConf.winningDialog) {
      const winningDialog = new WinningDialog('#winningDialogContainer');
    }
  }

  startGame(conf, elMarketPlace) {
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
  }

  addMarketPlace(conf) {
    const elMarketPlace = document.querySelector('#marketPlace');
    if (!conf.gameConf.marketCards) {
      ViewManipulator.toggleVisibility(elMarketPlace, false);
    }
    return elMarketPlace
  }

  setTitle(appTitle) {
    document.querySelector('title').innerText = appTitle;
  }

  showUserInfo() {
    if (ApiController.isLogged()) {
      ViewManipulator.showUserInfo();
    }
  }

  addLogoutBtn() {
    const apiCtrl = new ApiController();

    const logoutBtn = document.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        apiCtrl.logout();
      });
    }
  }

  addDauber(conf) {
    if (conf.gameConf.dauber) {
      const dauber = new Dauber(conf, document.querySelector('#tube'));
      const blower = new Blower(document.querySelector('#blower-balloon'));
    }
  }

  addWinPatternAnimModule(conf) {
    let elWinPatternsAnimModule = null;
    if (conf.gameConf.winPatternsAnimModule) {
      elWinPatternsAnimModule = document.querySelector('#winPatternsAnimModule');
      const horPattern = new WinPatternsAnimModule(elWinPatternsAnimModule.querySelector('#horizontal'), 5, 5, 'horizontal');
      const verPattern = new WinPatternsAnimModule(elWinPatternsAnimModule.querySelector('#vertical'), 5, 5, 'vertical');
      const diagPattern = new WinPatternsAnimModule(elWinPatternsAnimModule.querySelector('#diagonal'), 5, 5, 'diagonal');
    }
  }

  setCardPrices(conf) {
    MarketCards.setCardPrices(conf.gameConf.cardPrice, document.querySelectorAll('.cards'));
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
}

export default Initializer;