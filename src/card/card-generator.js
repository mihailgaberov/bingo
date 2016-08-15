/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import GenerateCardNumbers from './generate-card-numbers'

class CardGenerator {
	constructor() {
		this.genRandomNumbers = new GenerateCardNumbers();
	}
}

export default CardGenerator;
