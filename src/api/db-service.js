/**
 * Created by Mihail on 11/19/2016.
 */
'use strict';

import LocalStorageService from '../local-storage/local-storage-service';

class DbService {
	static getPlayerBalance() {

		fetch('http://localhost:8888/bingo-api/profile', {
			method: 'GET',
			mode: 'cors',
			redirect: 'follow',
			headers: {
				Authorization: 'Bearer '+ LocalStorageService.getToken()
			}
		}).then((res) => {
			console.log('>>>>>>>:::: ', res.json());
			return res.json();
		}).then((returnedValue) => {
			console.log('>>>>>>>:returnedValue: ', returnedValue);
		}).catch(function (err) {
			console.log('>>> Fetching error: ', err);
		});
	}
}

export default DbService;