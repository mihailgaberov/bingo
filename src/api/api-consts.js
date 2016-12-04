/**
 * Created by Mihail on 11/19/2016.
 */
"use strict";

const ApiConsts = {
	CONF: 'http://localhost:8000/config.json',
	REGISTER: 'http://localhost:8888/bingo-api/register',
	LOGIN: 'http://localhost:8888/bingo-api/login',
	PROFILE: 'http://localhost:8888/bingo-api/profile',
	SET_BALANCE: 'http://localhost:8888/bingo-api/setNewBalance',
	GET_PLAYERS_DATA: 'http://localhost:8888/bingo-api/getPlayersData',
	CREATE_PLAYER: 'http://localhost:8888/bingo-api/createPlayer',
	UPDATE_PLAYER_DATA: 'http://localhost:8888/bingo-api/updatePlayer',
	DELETE_PLAYER: 'http://localhost:8888/bingo-api/deletePlayer'
};

export { ApiConsts };
