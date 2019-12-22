import classNames from 'classnames';
import React from 'react';

const Button = props =>
	props.href
		? <a {...props} className={classNames('button', props.className)}/>
		: <button {...props} className={classNames('button', props.className)}/>;

export default Button;
