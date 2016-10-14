/**
 * Created by Mihail on 10/14/2016.
 */

class Timer {
	constructor(seconds, eventName, isVisible) {
		this.seconds = seconds;
		this.eventName = eventName;
		this.isVisible = isVisible;
	}

	pulsate() {
		if (this.isVisible) {
			let sec = 0;
			if (!isNaN(parseInt(this.seconds))) {
				const intervalID = setInterval(function () {
					document.querySelector('#timerContainer').children[0].innerHTML = '00:0' + (this.seconds - sec);
					if (sec++ === this.seconds) {
						window.clearInterval(intervalID);
					}
				}, 1000);
			}
		}
	}
}

export default Timer;