/**
 * Created by Mihail on 8/15/2016 - Started the project on St. Mary day
 */
'use strict';

import ApiConsts from './api/api-consts';
import Initializer from './initializer/initializer';

class App {
	static async start() {
    fetch(ApiConsts.CONF).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then((config) => {
      Initializer.applyConfigurations(config);
    }).catch(error => console.log('>>> error fetching: ', error));
  };
}

export default App;

((App) => {
	App.start().then(console.log('Game Started!'));
})(App);
