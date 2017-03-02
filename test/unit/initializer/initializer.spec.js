/**
 * Created by Mihail on 2/25/2017.
 */
'use strict';

import jsdom from 'mocha-jsdom';
import Initializer from '../../../src/initializer/initializer';
import {expect, assert} from 'chai';

describe('App Initializer', () => {

  jsdom();

  const conf = {
    "gameConf": {
      "id": "1",
      "name": "American Bingo",
      "numbers": [
        1, 2, 3, 4, 5,
        6, 7, 8, 9, 10,
        11, 12, 13, 14, 15,
        16, 17, 18, 19, 20,
        21, 22, 23, 24, 25,
        26, 27, 28, 29, 30,
        31, 32, 33, 34, 35,
        36, 37, 38, 39, 40,
        41, 42, 43, 44, 45,
        46, 47, 48, 49, 50,
        51, 52, 53, 54, 55,
        56, 57, 58, 59, 60,
        61, 62, 63, 64, 65,
        66, 67, 68, 69, 70,
        71, 72, 73, 74, 75
      ],
      "skin": {
        "name": "original"
      },
      "appTitle": "Welcome To Bingo Bigul",
      "turnsCount": 4,
      "freeSpotImgPath": "<img src='../../images/small_logo_30x30.png' />",
      "drawIntervalSeconds": 3,
      "beforeStartGameSeconds": 3,
      "marketCards": true,
      "dauber": true,
      "playingCards": true,
      "mainGame": true,
      "winningDialog": true,
      "cardPrice": 2,
      "winPatternsAnimModule": true
    }
  };

  it('Should have method for applying the game configurations', () => {
    expect(Initializer.hasOwnProperty(Initializer.applyConfigurations)).to.be.truthy;
  });

  it('Should have method for setting the app title', () => {
    expect(Initializer.hasOwnProperty(Initializer.setTitle)).to.be.truthy;
  });

  it('Should have method for adding Winning Dialog', () => {
    expect(Initializer.hasOwnProperty(Initializer.addWinningDialog)).to.be.truthy;
  });

  it('Should have method for setting card prices', () => {
    expect(Initializer.hasOwnProperty(Initializer.setCardPrices)).to.be.truthy;
  });

  it('Should have method for adding Winning Animation module', () => {
    expect(Initializer.hasOwnProperty(Initializer.addWinPatternAnimModule)).to.be.truthy;
  });

  it('Should have method for setup the game', () => {
    expect(Initializer.hasOwnProperty(Initializer.setupGame)).to.be.truthy;
  });

  it('Should have method for adding Dauber module', () => {
    expect(Initializer.hasOwnProperty(Initializer.addDauber)).to.be.truthy;
  });

  it('Should have method for adding Logout button', () => {
    expect(Initializer.hasOwnProperty(Initializer.addLogoutBtn)).to.be.truthy;
  });

  it('Should have method for showing user info', () => {
    expect(Initializer.hasOwnProperty(Initializer.setupGame)).to.be.truthy;
  });

  it('Should set the app meta title', () => {
    const el = document.createElement('title');
    el.innerText = 'test';
    document.head.appendChild(el);
    Initializer.setTitle('Welcome');
    expect(el.innerText).to.be.equal('Welcome');
  });

  it('Should add Winning Dialog instance', () => {
    let wd = Initializer.addWinningDialog(true);
    expect(wd).not.to.be.undefined;
    wd = Initializer.addWinningDialog(false);
    expect(wd).to.be.undefined;
  });

  it('Should set card prices', () => {
    let cards = document.createElement('div');
    cards.setAttribute('class', 'cards');
    let price = document.createElement('div');
    price.setAttribute('class', 'price');
    let radioInput = document.createElement('input');
    radioInput.setAttribute('type', 'radio');
    radioInput.checked = true;
    radioInput.setAttribute('value', 7);
    cards.appendChild(price);
    cards.appendChild(radioInput);
    document.body.appendChild(cards);
    const arrElements = Initializer.setCardPrices(conf.gameConf.cardPrice, cards);
    expect(arrElements[0].querySelector('.price').innerHTML.endsWith('14')).to.be.truthy;
  });

  it('Should add Winning Pattern Animations module', () => {
    const elWinPatternsAnimModule = document.createElement('div');
    elWinPatternsAnimModule.setAttribute('id', 'winPatternsAnimModule');
    const horPattern = document.createElement('div');
    horPattern.setAttribute('id', 'horizontal');
    const verPattern = document.createElement('div');
    verPattern.setAttribute('id', 'vertical');
    const diagPattern  = document.createElement('div');
    diagPattern.setAttribute('id', 'diagonal');
    elWinPatternsAnimModule.appendChild(horPattern);
    elWinPatternsAnimModule.appendChild(verPattern);
    elWinPatternsAnimModule.appendChild(diagPattern);
    document.body.appendChild(elWinPatternsAnimModule);
    let res = Initializer.addWinPatternAnimModule(true);
    expect(res).not.to.be.undefined;
    res = Initializer.addWinPatternAnimModule(false);
    expect(res).to.be.undefined;
  });

  it('Should add start game button', () => {
    let startBtn = Initializer.addStartButton(conf, Initializer.addMarketPlace(true));
    expect(startBtn).not.to.be.undefined;
    conf.gameConf.mainGame = false;
    startBtn = Initializer.addStartButton(conf, Initializer.addMarketPlace(true));
    expect(startBtn).to.be.undefined;
  });

  it('Should create a Timer object', () => {
    const timer = Initializer.getTimer(conf);
    expect(timer).not.to.be.undefined;
    expect(timer).to.be.object;
    expect(timer.hasOwnProperty(timer.element)).to.be.truthy;
    expect(timer.hasOwnProperty(timer.seconds)).to.be.truthy;
    expect(timer.hasOwnProperty(timer.eventName)).to.be.truthy;
    expect(timer.hasOwnProperty(timer.isVisible)).to.be.truthy;
  });

  it('Should add dauber elements', () => {
    const tube = document.createElement('div');
    tube.setAttribute('id', 'tube');
    const blowerBaloon = document.createElement('canvas');
    blowerBaloon.setAttribute('id', 'blower-balloon');
    document.body.appendChild(tube);
    document.body.appendChild(blowerBaloon);
    let res = Initializer.addDauber(conf);
    expect(res.dauber).not.to.be.undefined;
    expect(res.blower).not.to.be.undefined;
  });

  it('Should attach enough balance listener', () => {
    Initializer.attachEnoughBalanceListener(Initializer.addMarketPlace(true), conf, document);
    expect(document.hasOwnProperty('enoughBalance')).to.be.truthy;
  });
});