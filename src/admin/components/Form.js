/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

/* @flow */

import CRUDStore from '../flux/CRUDStore';
import FormInput from './FormInput';
import React, {Component} from 'react';
import type {FormInputField, FormInputFieldValue} from './FormInput';

type Props = {
	readonly?: boolean,
	recordId: ?number,
};

class Form extends Component {

	fields: Array<Object>;
	initialData: ?Object;

	constructor(props: Props) {
		super(props);
		this.fields = CRUDStore.getSchema();

		if ('recordId' in this.props) {
			this.initialData = CRUDStore.getRecord(this.props.recordId);
		}
	}

	getData(): Object {
		let data: Object = {};
		this.fields.forEach((field: FormInputField) =>
			data[field.id] = this.refs[field.id].getValue()
		);
		return data;
	}

	render() {
		return (
			<form id="form">{this.fields.map((field: FormInputField) => {
				let prefilled: FormInputFieldValue = '';
				if (this.initialData) {
					prefilled = this.initialData[field.id];
				}

				if (!this.props.readonly) {
					return (
						<div className="form-row" key={field.id}>
							<label className="form-label" htmlFor={field.id}>{field.label}:</label>
							<FormInput {...field} ref={field.id} defaultValue={prefilled} />
						</div>
					);
				}
				if (!prefilled) {
					return null;
				}
				return (
					<div className="form-row" key={field.id}>
						<span className="form-label">{field.label}:</span>
						{
							<div>{prefilled}</div>
						}
					</div>
				);
			}, this)}</form>
		);
	}
}

export default Form