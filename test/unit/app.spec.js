/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import App from '../../src/app';
import Initializer from '../../src/initializer/initializer';
import { expect } from 'chai';

describe('Bingo App', () => {
  it('Should initialize the game via Game Initializer', () => {
    expect(Initializer.applyConfigurations).to.be.called;
  });
});