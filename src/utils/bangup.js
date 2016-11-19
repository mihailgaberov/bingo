/**
 * Created by Mihail on 10/23/2016.
 */

class Bangup {
	constructor(container, fromSum, toSum, duration) {
		this.container = container;
		this.fromSum = Math.round(fromSum);
		this.toSum = Math.round(toSum);
		this.startTime = null;
		this.duration = Number(duration) * 1000 || 2000;

		/**
		 * http://paulirish.com/2011/requestanimationframe-for-smart-animating
		 * shim layer with setTimeout fallback
		 */
		window.requestAnimFrame = (function () {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();

		window.requestAnimationFrame(this.pileNumbers.bind(this));
	}

	pileNumbers(timestamp) {
		if (!this.startTime) {
			this.startTime = timestamp;
		}

		let progress = timestamp - this.startTime;
		this.container.innerHTML = Math.round(Bangup.easeOutExpo(progress, this.fromSum, this.toSum - this.fromSum, this.duration));

		// Continue until the end sum is reached
		if (Number(this.container.innerHTML) !== this.toSum) {
			window.requestAnimationFrame(this.pileNumbers.bind(this));
		}
	}

	/**
	 * Robert Penner's easeOutExpo
	 * @param currentTime current time
	 * @param startValue start value
	 * @param endValue end value - the value which should reach
	 * @param duration duration in milliseconds
	 * @returns {*}
	 */
	static easeOutExpo(currentTime, startValue, endValue, duration) {
		return (currentTime == duration) ? startValue + endValue : endValue * (-Math.pow(2, -10 * currentTime / duration) + 1) + startValue;
	}
}

export default Bangup;