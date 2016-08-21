/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import GenerateCardNumbers from './generate-card-numbers'

class CardGenerator {
	constructor(conf) {
		this.genRandomNumbers = new GenerateCardNumbers(conf);
	}
}

export default CardGenerator;
