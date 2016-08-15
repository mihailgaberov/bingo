/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';

import CardGenerator from './card/card-generator';

class App {
	constructor(title = 'Bingo game') {
		this.title = title;
		this.cardGenerator = new CardGenerator();
	}
}

export default App;
