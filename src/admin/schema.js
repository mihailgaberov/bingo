/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

export default [
	{
		id: 'email',
		label: 'Email',
		type: 'email',
		show: true,
		sample: 'me@mihail-gaberov.eu',
		editable: false
	},
	{
		id: 'name',
		label: 'Name',
		show: true,
		sample: 'Mihail Gaberov',
		align: 'left',
		editable: true
	},
	{
		id: 'password',
		label: 'Password',
		show: false,
		editable: true
	},
	{
		id: 'balance',
		label: 'Balance',
		type: 'number',
		show: true,
		sample: '50',
		editable: true
	},
	{
		id: 'wins',
		label: 'Wins',
		type: 'number',
		show: true,
		sample: '7',
		editable: true
	}
]
