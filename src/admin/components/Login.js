/**
 * Created by Mihail on 12/8/2016.
 */
'use strict';

import React from 'react';
import EventsConsts from './EventsConsts';
import { EventEmitter } from 'fbemitter';
import Button from './Button';

const emitter = new EventEmitter();

class Login extends React.Component {
	constructor() {
		super();
		Login.login = Login.login.bind(this);
	}

	static addListener(eventType: string, fn: Function) {
		emitter.addListener(eventType, fn);
	}

	static login() {
		emitter.emit(EventsConsts.LOGIN);
	}

	render() {
		return <div>
			<Button onClick={Login.login}>
				Login
			</Button>
		</div>
	}
}
export default Login