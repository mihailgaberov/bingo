/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import 'es6-promise';
import 'isomorphic-fetch';
import { ApiConsts } from './api/api-consts';
import Initializator from './initializer/initializer';

class App {
	constructor() {
		this.confUrl = ApiConsts.CONF;

    fetch(this.confUrl).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then((config) => {
      Initializator.applyConfigurations(config);
    });
	}
}

export default App;

(() => {
	const app = new App();
})();
