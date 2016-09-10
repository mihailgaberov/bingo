/**
 * Created by Mihail on 9/8/2016.
 */
"use strict";

const NumbersGeneration = {
	getRandomNumber (min, max) {
		if (max === undefined) {
			max = min;
			min = 0;
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getDifferentRandomNumber(min, max, numbers) {
		let randomNumber;
		do {
			randomNumber = this.getRandomNumber(min, max);
		} while (numbers.indexOf(randomNumber) !== -1);
		return randomNumber;
	},

	getFirstColumnAmerican (arrNumbers) {
		/*let i;
		let arrToReturn = [];
		for (i = 0; i < 5; i ++) {
			console.log('>>>>>>>>> 2');
			arrToReturn.push(this.getDifferentRandomNumber(1, 15, arrNumbers));

			//console.log('>> first column: ', arrToReturn);
		}

		console.log('>> first column: ', arrToReturn);
		return arrToReturn;*/
	}
};

export { NumbersGeneration };
