/**
 * Created by Mihail on 10/29/2016.
 */

class Animator {

	static bounce(progress) {
		for (var a = 0, b = 1; 1; a += b, b /= 2) {
			if (progress >= (7 - 4 * a) / 11) {
				return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
			}
		}
	}

	static quad(progress) {
		return Math.pow(progress, 2)
	}

	static linear(progress) {
		return progress
	}

	static animate(opts) {
		const start = new Date;

		var id = setInterval(function () {
			const timePassed = new Date - start;
			let progress = timePassed / opts.duration;

			if (progress > 1) progress = 1;

			const delta = opts.delta(progress);

			opts.step(delta);

			if (progress === 1) {
				clearInterval(id);
			}
		}, opts.delay || 10);
	}

	static move(element, toTop, toLeft, delta, duration, units) {
		if (!isNaN(toTop)) {
			Animator.animate({
				delay: 5,
				duration: duration || 500,
				delta: delta,
				step: (delta) => {
					element.style.top = toTop * delta + units;
				}
			});
		}

		if (!isNaN(toLeft)) {
			Animator.animate({
				delay: 10,
				duration: duration || 1000,
				delta: delta,
				step: (delta) => {
					element.style.left = toLeft * delta + units;
				}
			});
		}
	}

	static rotateElement(element, degrees, delta, duration) {
		Animator.animate({
			delay: 10,
			duration: duration || 1000,
			delta: delta || Animator.linear,
			step: (delta) => {
				element.style.transform = "rotate(" + degrees * delta + "deg)";
			}
		});
	}
}

export default Animator;
