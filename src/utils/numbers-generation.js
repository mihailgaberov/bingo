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

	getColumnNumbers(arrNumbers, countNums = 5) {
		let objAdded = {}, arrOutput = [], i, l;

		for(i = 0, l = arrNumbers.length; i < l; ++i) {
			let randomNum = this.getRandomNumber(arrNumbers[1] , arrNumbers[14]);

			if(objAdded.hasOwnProperty(randomNum) || arrOutput.length === countNums) {
				continue;
			}

			arrOutput.push(randomNum);
			objAdded[randomNum] = 1;
		}

		return arrOutput;
	}

};

export { NumbersGeneration };
