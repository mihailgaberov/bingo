import CRUDStore from './flux/CRUDStore';
import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Login from './components/Login';
import Logout from './components/Logout';
import BackOffice from './components/BackOffice';
import ApiCtrl from '../API/api-controller';

ApiCtrl.getPlayersDataPromise().then((data) => {
	CRUDStore.init(data);

	// Start the app when the data is fetched from the database
	startApp();
});

const startApp = () => {
	ReactDOM.render(
		<div>
			<div className="main">
				<div className="app-header">
					<Logo /> Bingo Bigul Back Office
					<Logout />
				</div>
				<BackOffice />
			</div>
			<div className="login-form">
				<Login />
			</div>
		</div>,
		document.getElementById('backOfficeApp')
	);
};
