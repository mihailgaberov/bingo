	/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';
/* @flow */

import React, {Component} from 'react';

type FormInputFieldType = 'number' | 'email' | 'text' | 'input';
export type FormInputFieldValue = string | number;
export type FormInputField = {
	type: FormInputFieldType,
	defaultValue?: FormInputFieldValue,
	id?: string,
	options?: Array<string>,
	label?: string,
};

class FormInput extends Component {

	props: FormInputField;

	getValue(): FormInputFieldValue {
		return 'value' in this.refs.input
			? this.refs.input.value
			: this.refs.input.getValue();
	}

	render() {
		const common: Object = {
			id: this.props.id,
			ref: 'input',
			defaultValue: this.props.defaultValue,
		};
		switch (this.props.type) {
			case 'number':
				return (
					<input
						{...common}
						type="number"
						defaultValue={parseInt(this.props.defaultValue, 10) || 0} />
				);
			case 'password':
				return (
					<input
						{...common}
						type="password" />
				);
			case 'email':
				if (!this.props.readOnlyEmail) {
					return (
						<input
							{...common}
							type="email"
							defaultValue={this.props.defaultValue} />
					);
				}
				return (
					<div className="form-row" key={'email'}>
						{
							<div>{this.props.defaultValue}</div>
						}
					</div>
				);
			case 'text':
				return <textarea {...common} />;
			default:
				return <input {...common} type="text" />;
		}
	}
}

export default FormInput