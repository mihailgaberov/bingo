/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

class GenerateCardNumbers {
	constructor() {
		this.arrAmericanNumbers = [1, 2, 3, 4, 5,
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
														 ];
	}


	generate() {
		var arrGeneratedNums = [];
		var i = 1;
		while (i <= 24) {
			var num = this.arrAmericanNumbers[Math.floor(Math.random() * this.arrAmericanNumbers.length)];
			arrGeneratedNums.push(num);
			i++;
		}
		return arrGeneratedNums;
	}
}

export default GenerateCardNumbers;