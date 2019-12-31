import { Utils } from '../utils/utils';

const WinningPatterns = {
	isBingo(arrCoordinates) {
		let isBingo = false;
		for (let i = 1; i <= 5; i++) {
			if (i !== 3) {
				if (Utils.countInArray(arrCoordinates, i) === 5) {
					isBingo = true;
				}
			} else {
				if (Utils.countInArray(arrCoordinates, i) === 4) {
					isBingo = true;
				}
			}
		}
		return isBingo;
	},

	checkHorizontalPattern(arr) {
		const arrCoordinates = [];
		arr.forEach((el) => {
			let coorY = el.substr(1, 2);
			arrCoordinates.push(coorY);
		});

		return this.isBingo(arrCoordinates);
	},

	checkVerticalPattern(arr) {
		const arrCoordinates = [];
		arr.forEach((el) => {
			let coorX = el.substr(0, 1);
			arrCoordinates.push(coorX);
		});

		return this.isBingo(arrCoordinates);
	},

	checkDiagonalPattern(arr) {
		const arrStripped = Utils.eliminateDuplicates(arr);
		let isBingo = false;
		const arrPatternLeft = ["11", "22", "44", "55"];
		const arrPatternRight = ["15", "24", "42", "51"];

		isBingo = arrPatternLeft.every(elem => arrStripped.indexOf(elem) > -1);
		if (!isBingo)
			isBingo = arrPatternRight.every(elem => arrStripped.indexOf(elem) > -1);

		return isBingo;
	},

	checkCornersPattern(arr) {
		const arrStripped = Utils.eliminateDuplicates(arr);
		let isBingo = false;
		const arrPattern = ["11", "15", "51", "55"];

		isBingo = arrPattern.every(elem => arrStripped.indexOf(elem) > -1);

		return isBingo;
	}
};

export { WinningPatterns };
