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
}

export default Animator;
