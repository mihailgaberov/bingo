/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

import React, {Component, PropTypes} from 'react';

class FormInput extends Component {

	getValue() {
		return 'value' in this.refs.input
			? this.refs.input.value
			: this.refs.input.getValue();
	}

	render() {
		const common = {
			id: this.props.id,
			ref: 'input',
			defaultValue: this.props.defaultValue,
		};
		switch (this.props.type) {
			case 'year':
				return (
					<input
						{...common}
						type="number"
						defaultValue={this.props.defaultValue || new Date().getFullYear()} />
				);
			case 'text':
				return <textarea {...common} />;
			default:
				return <input {...common} type="text" />;
		}
	}
}

FormInput.propTypes = {
	type: PropTypes.oneOf(['email', 'year', 'text', 'input']),
	id: PropTypes.string,
	options: PropTypes.array,
	defaultValue: PropTypes.any
};

export default FormInput