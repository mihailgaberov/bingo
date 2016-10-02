/**
 * Created by Mihail on 10/2/2016.
 */

"use strict";

const Utils = {

	eliminateDuplicates(arr) {
		let i,
			len = arr.length,
			arrOut = [],
			objTemp = {};

		for (i = 0; i < len; i++) {
			objTemp[arr[i]] = 0;
		}
		for (i in objTemp) {
			if (objTemp.hasOwnProperty(i))
				arrOut.push(i);
		}
		return arrOut;
	}

};

export { Utils };
