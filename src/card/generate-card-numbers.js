/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import App from '../app';

class GenerateCardNumbers {
	constructor(conf) {
		if (conf !== undefined)
			this.arrAmericanNumbers = conf.numbers;
	}

	/**
	 * Do random generation of the numbers by columns:
	 * On a real Bingo card, each column has a different
	 * range of numbers: B is 1–15, I is 16–30, N is 31–45,
	 * G is 46–60, and O is 61–75
	 * @returns {Array}
	 */
	generate(arrNums) {
		let arrGeneratedNums = [];
		let i = 1;
		while (i <= 24) {
			let num = arrNums[Math.floor(Math.random() * arrNums.length)];
			arrGeneratedNums.push(num);
			i++;
		}
		return arrGeneratedNums;
	}
}

export default GenerateCardNumbers;