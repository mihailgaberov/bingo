/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
class CardGenerator {
	constructor() {
		this.initialized = true;
	}

	generate() {
		if (this.initialized) {
			return 1;
		}
	}
}

export default CardGenerator;
