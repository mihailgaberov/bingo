/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';
/* @flow */

import classNames from 'classnames';
import React, {PropTypes} from 'react';

const Button = props =>
	props.href
		? <a {...props} className={classNames('button', props.className)}/>
		: <button {...props} className={classNames('button', props.className)}/>;

Button.propTypes = {
	href: PropTypes.string
};

export default Button