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
import {EventsConsts} from '../events/events-consts';
import WinningDialog from '../winning/winning-dialog';
import WinPatternsAnimModule from '../winning/win-patterns-anim-module';

class Initializer {
  static applyConfigurations(conf) {
    Initializer.setTitle(conf.gameConf.appTitle);
    Initializer.addWinningDialog(conf.gameConf.winningDialog);
    Initializer.setCardPrices(conf.gameConf.cardPrice);
    Initializer.addWinPatternAnimModule(conf.gameConf.winPatternsAnimModule);
    Initializer.setupGame(conf, Initializer.addMarketPlace(conf.gameConf.marketCards));
    Initializer.addDauber(conf);
    Initializer.addLogoutBtn();
    Initializer.showUserInfo();
  }

  static setTitle(appTitle) {
    document.querySelector('title').innerText = appTitle;
  }

  static addWinningDialog(isConfigured) {
    return isConfigured ? new WinningDialog('#winningDialogContainer') : undefined;
  }

  static setCardPrices(price) {
    return MarketCards.setCardPrices(price, document.querySelectorAll('.cards'));
  }

  static addWinPatternAnimModule(isConfigured) {
    let elWinPatternsAnimModule = null;
    if (isConfigured) {
      elWinPatternsAnimModule = document.querySelector('#winPatternsAnimModule');
      const horPattern = new WinPatternsAnimModule(elWinPatternsAnimModule.querySelector('#horizontal'), 5, 5, 'horizontal');
      const verPattern = new WinPatternsAnimModule(elWinPatternsAnimModule.querySelector('#vertical'), 5, 5, 'vertical');
      const diagPattern = new WinPatternsAnimModule(elWinPatternsAnimModule.querySelector('#diagonal'), 5, 5, 'diagonal');
    }
  }

  static setupGame(conf, elMarketPlace) {
    if (conf.gameConf.mainGame) {
      const timer = new Timer(
        document.querySelector('#timerContainer'),
        conf.gameConf.beforeStartGameSeconds,
        EventsConsts.START_GAME, true
      );

      document.addEventListener(EventsConsts.ENOUGH_BALANCE, () => {
        ViewManipulator.toggleVisibility(elMarketPlace, false);
        ViewManipulator.toggleVisibility(document.querySelector('#footer'), false);
        timer.startCounting();
      });

      const startBtn = document.querySelector('#startBtn');
      if (startBtn) {
        startBtn.addEventListener('click', (e) => {
          Initializer.buyCards(conf, elMarketPlace);
        });
      }
    }
  }

  static addMarketPlace(isConfigured) {
    const elMarketPlace = document.querySelector('#marketPlace');
    if (!isConfigured) {
      ViewManipulator.toggleVisibility(elMarketPlace, false);
    }
    return elMarketPlace
  }

  static buyCards(conf, container) {
    if (conf.gameConf.playingCards) {
      const cardGen = new CardGenerator(conf);
      const marketCards = new MarketCards(container);
      MarketCards.buyCards(Initializer.renderPurchasedCards(marketCards, cardGen), conf.gameConf.cardPrice);
    }
  }

  static renderPurchasedCards(marketCards, cardGen) {
    const purchasedCardsCount = MarketCards.getPurchasedCardsCount(marketCards.getRadioButtonsArray());
    const cardDrawer = new CardDrawer(
      cardGen.generateCards(purchasedCardsCount),
      document.querySelector('#leftGameScreen')
    );
    return purchasedCardsCount
  }

  static addDauber(conf) {
    if (conf) {
      const dauber = new Dauber(conf, document.querySelector('#tube'));
      const blower = new Blower(document.querySelector('#blower-balloon'));
    }
  }

  static showUserInfo() {
    if (ApiController.isLogged()) {
      ViewManipulator.showUserInfo();
    }
  }

  static addLogoutBtn() {
    const apiCtrl = new ApiController();

    const logoutBtn = document.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        apiCtrl.logout();
      });
    }
  }
}

export default Initializer;