import React from 'react';

const Actions = props =>
	<div id="actions">
    <span
	    data-testid="actions"
	    tabIndex="0"
	    className="actions-info"
	    title="More info"
	    onClick={props.onAction.bind(null, 'info')}>&#8505;</span>
		<span
			data-testid="actions"
			tabIndex="0"
			className="actions-edit"
			title="Edit"
			onClick={props.onAction.bind(null, 'edit')}>&#10000;</span>
		<span
			data-testid="actions"
			tabIndex="0"
			className="actions-delete"
			title="Delete"
			onClick={props.onAction.bind(null, 'delete')}>x</span>
	</div>;

export default Actions;
