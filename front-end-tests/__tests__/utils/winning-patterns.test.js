import { WinningPatterns } from '../../../src/utils/winning-patterns';

describe('WinningPatterns module', () => {

	test('Should provide a method for checking horizontal Bingo pattern', () => {
		let arr = ['11', '21', '31', '41', '51'];
		let res = WinningPatterns.checkHorizontalPattern(arr);
		expect(res).toBeTruthy();

		arr = ['11', '22', '31', '41', '51'];
		res = WinningPatterns.checkHorizontalPattern(arr);
		expect(res).not.toBeTruthy();

		arr = ['13', '23', '43', '53'];
		res = WinningPatterns.checkHorizontalPattern(arr);
		expect(res).toBeTruthy();

		arr = ['13', '23', '44', '53'];
		res = WinningPatterns.checkHorizontalPattern(arr);
		expect(res).not.toBeTruthy();
	});

	test('Should provide a method for checking vertical Bingo pattern', () => {
		let arr = ['11', '12', '13', '14', '15'];
		let res = WinningPatterns.checkVerticalPattern(arr);
		expect(res).toBeTruthy();

		arr = ['11', '12', '13', '14', '22'];
		res = WinningPatterns.checkVerticalPattern(arr);
		expect(res).not.toBeTruthy();

		arr = ['31', '32', '34', '35'];
		res = WinningPatterns.checkVerticalPattern(arr);
		expect(res).toBeTruthy();

		arr = ['31', '32', '34', '43'];
		res = WinningPatterns.checkVerticalPattern(arr);
		expect(res).not.toBeTruthy();
	});

	test('Should provide a method for checking diagonal Bingo pattern', () => {
		let arr = ["11", "22", "44", "55"];
		let res = WinningPatterns.checkDiagonalPattern(arr);
		expect(res).toBeTruthy();

		arr = ["11", "22", "44", "53"];
		res = WinningPatterns.checkDiagonalPattern(arr);
		expect(res).not.toBeTruthy();

		arr = ["15", "24", "42", "51"];
		res = WinningPatterns.checkDiagonalPattern(arr);
		expect(res).toBeTruthy();

		arr = ["15", "24", "42", "25"];
		res = WinningPatterns.checkDiagonalPattern(arr);
		expect(res).not.toBeTruthy();
	});

	test('Should provide a method for checking corners Bingo pattern', () => {
		let arr = ["11", "15", "51", "55"];
		let res = WinningPatterns.checkCornersPattern(arr);
		expect(res).toBeTruthy();

		arr = ["11", "15", "51", "44"];
		res = WinningPatterns.checkCornersPattern(arr);
		expect(res).not.toBeTruthy();
	});
});
