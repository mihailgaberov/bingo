/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

import CRUDStore from './flux/CRUDStore';
import React from 'react';
import ReactDOM from 'react-dom';
import EventsConsts from './components/EventsConsts';
import Logo from './components/Logo';
import Login from './components/Login';
import Logout from './components/Logout';
import BackOffice from './components/BackOffice';
import Form from './components/Form';
import ApiCtrl from '../api/api-controller';
import SchemaEmail from './schema-email';

ApiCtrl.getPlayersDataPromise().then((data) => {
	CRUDStore.init(data);

	// Start the app when the data is fetched from the database
	startApp();
});

const startApp = () => {
	Logout.addListener(EventsConsts.LOGOUT, () => {
		console.log('>>>> catch Log me out!');
	});

	Login.addListener(EventsConsts.LOGIN, () => {
		console.log('>>>> catch Log me in!');
	});

	ReactDOM.render(
		<div>
			<div className="main" style={{display: 'none'}}>
				<div className="app-header">
					<Logo /> Bingo Bigul Back Office
					<Logout />
				</div>
				<BackOffice />
			</div>
			<div className="login-form" style={{display: 'block'}}>
				<h3>Bingo Bigul Back Office Login</h3>
				<Form fields={SchemaEmail}
				/>
				<Login />
			</div>
		</div>,
		document.getElementById('backOfficeApp')
	);
};