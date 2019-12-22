import React from 'react';
import Button from './Button';
import EventsConsts from '../components/EventsConsts';
import CRUDStore from '../flux/CRUDStore';

type State = {
	isLogged: boolean
}

class Logout extends React.Component {

	state: State;

	constructor() {
		super();
		Logout.logout = Logout.logout.bind(this);

		this.state = {
			isLogged: CRUDStore.isLoggedIn()
		};

		CRUDStore.addListener(EventsConsts.LOGIN_SUCCESS, () => {
			this.setState({isLogged: true});
		});

		CRUDStore.addListener(EventsConsts.LOGOUT, () => {
			this.setState({isLogged: false});
		});
	}

	static logout() {
		CRUDStore.logout();
	}

	render() {
		return <div className="logout-module" style={{display: this.state.isLogged ? 'block' : 'none'}}>
			<Button onClick={Logout.logout}>
				Logout
			</Button>
		</div>
	}
}
export default Logout;
