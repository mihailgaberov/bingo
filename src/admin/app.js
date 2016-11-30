/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

import CRUDStore from './flux/CRUDStore';
import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import BackOffice from './components/BackOffice';
import schema from './schema';

CRUDStore.init(schema);

ReactDOM.render(
	<div>
		<div className="app-header">
			<Logo/> Welcome to Whinepad!
		</div>
		<BackOffice />
	</div>,
	document.getElementById('backOffice')
);