/**
 * Created by Mihail on 12/8/2016.
 */
'use strict';

import React from 'react';
import Button from './Button';
import SchemaEmail from '../schema-email';
import Form from './Form';
import CRUDStore from '../flux/CRUDStore';

class Login extends React.Component {
	constructor() {
		super();
		Login.login = Login.login.bind(this);
	}

	static login() {
		console.log('>>>> login: ', this.refs.loginForm.getData());
		CRUDStore.checkLogin(this.refs.loginForm.getData());
	}

	render() {
		return <div>
			<Form fields={SchemaEmail} ref="loginForm" />
			<Button onClick={Login.login}>
				Login
			</Button>
		</div>
	}
}
export default Login