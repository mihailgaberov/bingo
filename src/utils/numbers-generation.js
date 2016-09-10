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

	getColumnNumbers(arrNumbers) {
		let objAdded = {}, arrOutput = [], i, l;

		for(i = 0, l = arrNumbers.length; i < l; ++i) {
			let randonNum = this.getRandomNumber(1 ,15);

			if(objAdded.hasOwnProperty(randonNum) || arrOutput.length === 5) {
				continue;
			}

			arrOutput.push(randonNum);
			objAdded[randonNum] = 1;
		}

		return arrOutput;
	}

};

export { NumbersGeneration };
