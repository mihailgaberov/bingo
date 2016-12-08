/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

import CRUDStore from './flux/CRUDStore';
import React from 'react';
import ReactDOM from 'react-dom';
import EventsConsts from './components/EventsConsts';
import Logo from './components/Logo';
import Logout from './components/Logout';
import BackOffice from './components/BackOffice';
import ApiCtrl from '../api/api-controller';

ApiCtrl.getPlayersDataPromise().then((data) => {
	CRUDStore.init(data);

	// Start the app when the data is fetched from the database
	startApp();
});

const startApp = () => {

	Logout.addListener(EventsConsts.LOGOUT, () => {
		console.log(' catch Log me out!');
	});

	ReactDOM.render(
		<div>
			<div className="app-header">
				<Logo /> Bingo Bigul Back Office
				<Logout />
			</div>
			<BackOffice />
		</div>,
		document.getElementById('backOfficeApp')
	);
};