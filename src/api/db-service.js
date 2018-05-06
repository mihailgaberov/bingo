/**
 * Created by Mihail on 11/19/2016.
 */
'use strict';

import LocalStorageService from '../local-storage/local-storage-service';
import ApiConsts from './api-consts';

class DbService {
	static loginPlayer(email, pass) {
		return fetch(ApiConsts.LOGIN, {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: pass
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue;
		}).catch(function (err) {
			console.log('>>> Fetching error on login: ', err);
		});
	}

	static registerPlayer(name, email, pass) {
		return fetch(ApiConsts.REGISTER, {
			method: 'POST',
			body: JSON.stringify({
				name: name,
				email: email,
				password: pass
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue;
		}).catch(function (err) {
			console.log('>>> Fetching error on register: ', err);
		});
	}

	static getPlayerBalance() {
		return fetch(ApiConsts.PROFILE, {
			method: 'GET',
			mode: 'cors',
			redirect: 'follow',
			headers: {
				Authorization: 'Bearer '+ LocalStorageService.getToken()
			}
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue.balance;
		}).catch(function (err) {
			console.log('>>> Fetching error on getting player balance: ', err);
		});
	}

	static updateBalance(email, sum, spending) {
		return fetch(ApiConsts.SET_BALANCE, {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				newSum: sum,
				spending: spending
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer '+ LocalStorageService.getToken()
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue;
		}).catch(function (err) {
			console.log('>>> Fetching error on updating balance: ', err);
		});
	}

	static getAllPlayersData() {
		return fetch(ApiConsts.GET_PLAYERS_DATA, {
			method: 'GET',
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer '+ LocalStorageService.getAdminToken()
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue;
		}).catch(function (err) {
			console.log('>>> Fetching error on getting all players data: ', err);
		});
	}

	static createPlayer(objPlayerData) {
		return fetch(ApiConsts.CREATE_PLAYER, {
			method: 'POST',
			body: JSON.stringify({
				objPlayerData: objPlayerData
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer '+ LocalStorageService.getAdminToken()
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue;
		}).catch(function (err) {
			console.log('>>> Fetching error on creating player: ', err);
		});
	}

	static deletePlayer(playerEmail) {
		return fetch(ApiConsts.DELETE_PLAYER, {
			method: 'POST',
			body: JSON.stringify({
				email: playerEmail
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer '+ LocalStorageService.getAdminToken()
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue;
		}).catch(function (err) {
			console.log('>>> Fetching error on deleting player: ', err);
		});
	}

	static updatePlayerData(objPlayerData) {
		return fetch(ApiConsts.UPDATE_PLAYER_DATA, {
			method: 'POST',
			body: JSON.stringify({
				objPlayerData: objPlayerData
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer '+ LocalStorageService.getAdminToken()
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue;
		}).catch(function (err) {
			console.log('>>> Fetching error on updating player data: ', err);
		});
	}

	static loginAdmin(objCredentials) {
		return fetch(ApiConsts.LOGIN_ADMIN, {
			method: 'POST',
			body: JSON.stringify({
				email: objCredentials.email,
				password: objCredentials.password
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue;
		}).catch(function (err) {
			console.log('>>> Fetching error on admin login: ', err);
		});
	}

	static setWins(email, wins) {
		return fetch(ApiConsts.SET_WINS, {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				wins: wins
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer '+ LocalStorageService.getToken()
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			return returnedValue;
		}).catch(function (err) {
			console.log('>>> Fetching error on setting wins: ', err);
		});
	}
}

export default DbService;