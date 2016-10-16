/**
 * Created by Mihail on 10/14/2016.
 */

class Timer {
	constructor(element, seconds, eventName, isVisible) {
		this.element = element;
		this.seconds = seconds;
		this.eventName = eventName;
		this.isVisible = isVisible;
	}

	pulsate() {
		let sec = 0;
		if (!isNaN(parseInt(this.seconds))) {
			const intervalID = setInterval(() => {
				this.element.style.display = (this.isVisible ? 'block' : 'none');
				this.element.children[0].innerHTML = `00:0${this.seconds - sec}`;
				if (sec++ === this.seconds) {
					window.clearInterval(intervalID);
					this.triggerEvent();
					this.hide();
				}
			}, 1000);
		}
	}

	hide() {
		this.element.style.display = 'none';
	}

	triggerEvent() {
		const event = new CustomEvent(
			this.eventName,
			{
				detail: {
					time: new Date()
				},
				bubbles: true,
				cancelable: true
			}
		);
		console.log('>>> triggerd event by Timer: ', event);
		this.element.dispatchEvent(event);
	}
}

export default Timer;