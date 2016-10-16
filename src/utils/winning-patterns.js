/**
 * Created by Mihail on 10/16/2016.
 */
"use strict";

import { Utils } from '../utils/utils';

const WinningPatterns = {
	checkHorizontalPattern(arr) {
		const arrCoordinates = [];
		arr.forEach((el) => {
			let coorY = el.substr(1, 2);
			arrCoordinates.push(coorY);
		});

		let isBingo = false;
		for (let i = 1; i <= 5; i++) {
			if (Utils.countInArray(arrCoordinates, i) === 5) {
				isBingo = true;
			}
		}

		return isBingo;
	},

	checkVerticalPattern(arr) {
		const arrCoordinates = [];
		arr.forEach((el) => {
			let coorX = el.substr(0, 1);
			arrCoordinates.push(coorX);
		});

		let isBingo = false;
		for (let i = 1; i <= 5; i++) {
			if (Utils.countInArray(arrCoordinates, i) === 5) {
				isBingo = true;
			}
		}

		return isBingo;
	},
	checkDiagonalPattern() {},
	checkCornersPattern() {}
};

export { WinningPatterns };