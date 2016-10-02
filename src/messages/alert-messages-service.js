/**
 * Created by Mihail on 9/18/2016.
 */
'use strict';

class AlertMessagesService {
	constructor() {}

	static showMsg(elMsg) {
		if (elMsg && elMsg.style.display === 'none') {
			elMsg.style.display = 'block';
		}
	}

	static hideMsg(elMsg) {
		if (elMsg && elMsg.style.display === 'block') {
			elMsg.style.display = 'none';
		}
	}

}

export default AlertMessagesService;

