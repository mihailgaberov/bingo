/**
 * Created by Mihail on 12/8/2016.
 */
'use strict';

import React from 'react';
import EventsConsts from './EventsConsts';
import { EventEmitter } from 'fbemitter';
import Button from './Button';

const emitter = new EventEmitter();

class Logout extends React.Component {
	constructor() {
		super();
		Logout.logout = Logout.logout.bind(this);
	}

	static addListener(eventType: string, fn: Function) {
		emitter.addListener(eventType, fn);
	}

	static logout() {
		emitter.emit(EventsConsts.LOGOUT);
	}

	render() {
		return <div className="logout-module">
			<Button onClick={Logout.logout}>
				Logout
			</Button>
		</div>;
	}
}
export default Logout