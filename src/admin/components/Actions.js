/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

import React, {PropTypes} from 'react';

const Actions = props =>
	<div id="actions">
    <span
	    tabIndex="0"
	    className="actions-info"
	    title="More info"
	    onClick={props.onAction.bind(null, 'info')}>&#8505;</span>
		<span
			tabIndex="0"
			className="actions-edit"
			title="Edit"
			onClick={props.onAction.bind(null, 'edit')}>&#10000;</span>
		<span
			tabIndex="0"
			className="actions-delete"
			title="Delete"
			onClick={props.onAction.bind(null, 'delete')}>x</span>
	</div>;

Actions.propTypes = {
	onAction: PropTypes.func
};

Actions.defaultProps = {
	onAction: () => {}
};

export default Actions