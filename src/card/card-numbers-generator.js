/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import { NumbersGenerator } from '../utils/numbers-generator';

class CardNumbersGenerator {
	constructor(conf) {
		if (conf !== undefined) {
			this.arrAmericanNumbers = conf.gameConf.numbers;
		}
	}

	/**
	 * Generates a random card with 5 columns and theirs numbers accordingly
	 * @returns {{col1: (*|Array), col2: (*|Array), col3: (*|Array), col4: (*|Array), col5: (*|Array)}}
	 */
	generate() {
		let arrCol1 = NumbersGenerator.getColumnNumbers(this.arrAmericanNumbers.slice(0, 15));
		let arrCol2 = NumbersGenerator.getColumnNumbers(this.arrAmericanNumbers.slice(15, 30));
		let arrCol3 = NumbersGenerator.getColumnNumbers(this.arrAmericanNumbers.slice(30, 45), 4);
		let arrCol4 = NumbersGenerator.getColumnNumbers(this.arrAmericanNumbers.slice(45, 60));
		let arrCol5 = NumbersGenerator.getColumnNumbers(this.arrAmericanNumbers.slice(60, 75));

		return {'col1': arrCol1,
				'col2': arrCol2,
				'col3': arrCol3,
				'col4': arrCol4,
				'col5': arrCol5
			  };
	}
}

export default CardNumbersGenerator;