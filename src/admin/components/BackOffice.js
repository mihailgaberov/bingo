/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';
/* @flow */

import Button from './Button';
import CRUDActions from '../flux/CRUDActions';
import CRUDStore from '../flux/CRUDStore';
import Dialog from './Dialog';
import Table from './Table';
import Form from './Form';
import React, {Component} from 'react';
import EventsConsts from './EventsConsts';

type State = {
	addnew: boolean,
	count: number,
	errorUserExists: boolean,
	errorDeletion: boolean,
	errorUpdating: boolean,
	isLogged: boolean
};

class BackOffice extends Component {

	state: State;

	constructor() {
		super();
		this.state = {
			addnew: false,
			errorUserExists: false,
			errorDeletion: false,
			errorUpdating: false,
			count: CRUDStore.getCount(),
			isLogged: CRUDStore.isLoggedIn()
		};

		CRUDStore.addListener(EventsConsts.CHANGE, () => {
			this.setState({
				count: CRUDStore.getCount(),
			})
		});

		CRUDStore.addListener(EventsConsts.USER_EXISTS, () => {
			this.setState({errorUserExists: true});
		});

		CRUDStore.addListener(EventsConsts.DELETE_ERROR, () => {
			this.setState({errorDeletion: true});
		});

		CRUDStore.addListener(EventsConsts.UPDATE_ERROR, () => {
			this.setState({errorUpdating: true});
		});

		CRUDStore.addListener(EventsConsts.LOGIN_SUCCESS, () => {
			this.setState({isLogged: true});
		});

		CRUDStore.addListener(EventsConsts.LOGOUT, () => {
			this.setState({isLogged: false});
		});
	}

	shouldComponentUpdate(newProps: Object, newState: State): boolean {
		return  newState.addnew !== this.state.addnew ||
				newState.count !== this.state.count ||
				newState.errorUserExists !== this.state.errorUserExists ||
				newState.errorDeletion !== this.state.errorDeletion ||
				newState.errorUpdating !== this.state.errorUpdating ||
				newState.isLogged !== this.state.isLogged;
	}

	_addNewDialog() {
		this.setState({addnew: true});
	}

	_closeErrorDialog() {
		if (this.state.errorUserExists)
			this.setState({errorUserExists: false});

		if (this.state.errorDeletion)
			this.setState({errorDeletion: false});

		if (this.state.errorUpdating)
			this.setState({errorUpdating: false});
	}

	_addNew(action: string) {
		this.setState({addnew: false});
		if (action === 'confirm') {
			CRUDActions.create(this.refs.form.getData());
		}
	}

	render() {
		return (
			<div id="backOffice" style={{display: this.state.isLogged ? 'block' : 'none'}}>
				<div className="toolbar">
					<div className="toolbar-add">
						<Button
							onClick={this._addNewDialog.bind(this)}
							className="toolbar-add-btn">
							+ add
						</Button>
					</div>
					<div className="toolbar-search">
						<input
							placeholder={this.state.count === 1
								? 'Search 1 record...'
								: `Search ${this.state.count} records...`
							}
							onChange={CRUDActions.search.bind(CRUDActions)}
							onFocus={CRUDActions.startSearching.bind(CRUDActions)}/>
					</div>
				</div>
				<div className="back-office-datagrid">
					<Table />
				</div>
				{this.state.addnew
					? <Dialog
					modal={true}
					header="Add New Player"
					confirmLabel="Add"
					onAction={this._addNew.bind(this)}
				>
					<Form ref="form"/>
				</Dialog>
					: null}

				{this.state.errorUserExists ?
					<Dialog
						modal={true}
						header="Error"
						confirmLabel="OK"
						hasCancel={false}
						onAction={this._closeErrorDialog.bind(this)}>
							User already exists!
					</Dialog>
				: null}

				{this.state.errorDeletion ?
					<Dialog
						modal={true}
						header="Error"
						confirmLabel="OK"
						hasCancel={false}
						onAction={this._closeErrorDialog.bind(this)}>
							Deleting player failed. Please try again later.
					</Dialog>
					: null}

				{this.state.errorUpdating ?
					<Dialog
						modal={true}
						header="Error"
						confirmLabel="OK"
						hasCancel={false}
						onAction={this._closeErrorDialog.bind(this)}>
						Updating player data failed. Please try again later.
					</Dialog>
					: null}
			</div>
		);
	}
}

export default BackOffice