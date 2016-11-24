/**
 * Created by Mihail on 11/22/2016.
 */
'use strict';

import ViewManipulator from '../utils/view-manipulator';
import { EventsConsts } from '../events/events-consts';

class WinPatternsAnimModule {
	constructor(elem, rows, cols, pattern) {
		this.elem = elem;
		this.rows = rows;
		this.cols = cols;
		this.pattern = pattern;

		document.addEventListener(EventsConsts.START_GAME, () => {
			ViewManipulator.toggleVisibility(elem.parentElement.parentElement, true);
		});

		document.addEventListener(EventsConsts.END_GAME, () => {
			ViewManipulator.toggleVisibility(elem.parentElement.parentElement, false);
		});

		// Create the DOM element
		this.createDomElement();
	}

	createDomElement() {
		const elTable = document.createElement('table');
		let i = 1;
		while (i <= this.rows) {
			const elRow = document.createElement('tr');
			let j = 1;
			while (j <= this.cols) {
				const elCell = document.createElement('td');
				elCell.setAttribute('id', 'x'+j + 'y' + i);
				elRow.appendChild(elCell);
				j++;
			}
			elTable.appendChild(elRow);
			i++;
		}
		this.elem.appendChild(elTable);

		this.startAnimation();
	}

	/**
	 *  Define which pattern animation to start
	 */
	startAnimation() {
		switch (this.pattern) {
			case 'horizontal':
				this.startHorizontalAnim();
				break;
			case 'vertical':
				this.startVerticalAnim();
				break;
			case 'diagonal':
				this.startDiagonallAnim();
				break;
		}
	}

	/**
	 * Clear all cells background
	 */
	clearTable() {
		const arrCells = this.elem.querySelectorAll('td');
		let cellIdx = 0;
		while (cellIdx < arrCells.length) {
			if (arrCells[cellIdx].classList.contains('highlighted')) {
				arrCells[cellIdx].classList.remove('highlighted');
			}
			cellIdx++;
		}
	}

	startHorizontalAnim() {
		let yIdx = 1;
		setInterval(() => {
			this.clearTable();

			let xIdx = 1;
			while (xIdx <= this.cols) {
				const elCell = this.elem.querySelector(`#x${xIdx}y${yIdx}`);
				elCell.classList.add('highlighted');
				xIdx++;
			}

			if (yIdx === this.rows) {
				yIdx = 0;
			}

			yIdx++;
		}, 1000)
	}

	startVerticalAnim() {
		let xIdx = 1;
		setInterval(() => {
			this.clearTable();

			let yIdx = 1;
			while (yIdx <= this.rows) {
				const elCell = this.elem.querySelector(`#x${xIdx}y${yIdx}`);
				elCell.classList.add('highlighted');
				yIdx++;
			}

			if (xIdx === this.rows) {
				xIdx = 0;
			}

			xIdx++;
		}, 1000)
	}

	startDiagonallAnim() {
		let count = 1;
		setInterval(() => {
			this.clearTable();

			switch (count) {
				case 1:
					let leftDiagonalIdx = 1;
					while (leftDiagonalIdx <= this.rows) {
						const elCell = this.elem.querySelector(`#x${leftDiagonalIdx}y${leftDiagonalIdx}`);
						elCell.classList.add('highlighted');
						leftDiagonalIdx++;
					}
					break;
				case 2:
					let rightDiagonalIdx = 1;
					while (rightDiagonalIdx <= this.rows) {
						const elCell = this.elem.querySelector(`#x${this.rows + 1 - rightDiagonalIdx}y${rightDiagonalIdx}`);
						elCell.classList.add('highlighted');
						rightDiagonalIdx++;
					}
					break;
				case 3:
					let cornersIdx = 1;
					const elTopLeft = this.elem.querySelector(`#x${cornersIdx}y${cornersIdx}`);
					elTopLeft.classList.add('highlighted');

					const elTopRight = this.elem.querySelector(`#x${this.rows + 1 - cornersIdx}y${cornersIdx}`);
					elTopRight.classList.add('highlighted');

					const elBottomLeft = this.elem.querySelector(`#x${cornersIdx}y${this.rows + 1 - cornersIdx}`);
					elBottomLeft.classList.add('highlighted');

					const elBottomRight = this.elem.querySelector(`#x${this.rows + 1 - cornersIdx}y${this.rows +1 - cornersIdx}`);
					elBottomRight.classList.add('highlighted');
					break;
			}
			count++;
			if (count > 3)
				count = 1;
		}, 1000);
	}
}

export default WinPatternsAnimModule;