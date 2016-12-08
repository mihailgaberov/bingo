/**
 * Created by Mihail on 12/8/2016.
 */
'use strict';

import React from 'react';
import Button from './Button';

class Logout extends React.Component {
	constructor() {
		super();
		this.logout = this.logout.bind(this);
	}


	logout() {
		console.log('>>> trigger logout event!');
	}

	render() {
		return <div className="logout-module">
			<Button onClick={this.logout}>
				Logout
			</Button>
		</div>;
	}
}
export default Logout