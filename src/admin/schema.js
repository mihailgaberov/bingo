/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

export default [
	{
		id: 'name',
		label: 'Name',
		show: true,
		sample: 'Mihail Gaberov',
		align: 'left'
	},
	{
		id: 'email',
		label: 'Email',
		type: 'email',
		show: true,
		sample: 'me@mihail-gaberov.eu'
	},
	{
		id: 'password',
		label: 'Password',
		show: false
	},
	{
		id: 'balance',
		label: 'Balance',
		type: 'number',
		show: true,
		sample: '50'
	},
	{
		id: 'wins',
		label: 'Wins',
		type: 'number',
		show: true,
		sample: '7'
	}
]
