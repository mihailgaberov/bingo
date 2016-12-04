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

type State = {
	addnew: boolean,
	count: number,
};

class BackOffice extends Component {

	state: State;

	constructor() {
		super();
		this.state = {
			addnew: false,
			count: CRUDStore.getCount(),
		};

		CRUDStore.addListener('change', () => {
			this.setState({
				count: CRUDStore.getCount(),
			})
		});
	}

	shouldComponentUpdate(newProps: Object, newState: State): boolean {
		return newState.addnew !== this.state.addnew || newState.count !== this.state.count;
	}

	_addNewDialog() {
		this.setState({addnew: true});
	}

	_addNew(action: string) {
		this.setState({addnew: false});
		if (action === 'confirm') {
			CRUDActions.create(this.refs.form.getData());
		}
	}

	render() {
		return (
			<div id="backOffice">
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
			</div>
		);
	}
}

export default BackOffice