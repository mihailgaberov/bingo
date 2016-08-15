/**
 * Created by Mihail on 8/15/2016.
 */
	'use strict';
class App {
	constructor(title = 'Bingo game') {
		this.title = title;
	}

	doIt(action = 'start') {
		return `${this.title}: ${action}`;
	}
}

export default App;
