import React from 'react';
import ReactDOM from 'react-dom';
import CRUDStore from './flux/CRUDStore';
import Button from './components/Button';
import Logo from './components/Logo';
import FormInput from './components/FormInput';
import Form from './components/Form';
import Actions from './components/Actions';
import Dialog from './components/Dialog';
import schema from './schema';

CRUDStore.init(schema);


ReactDOM.render(
	<div style={ {padding: '20px'} }>
		<h1>Discoverer Tool</h1>

		<h2>Logo</h2>
		<div style={ {display: 'inline-block', background: 'purple'} }>
			<Logo/>
		</div>

		<h2>Button</h2>
		<div>Button with onClick: <Button onClick={() => alert('Ouch!')}>Click me</Button></div>
		<div>A link: <Button href="http://mihail-gaberov.eu">Follow me</Button></div>
		<div>Custom class name: <Button className="custom">I do nothing</Button></div>

		<h2>Form inputs</h2>
		<table><tbody>
		<tr>
			<td>Vanilla input</td>
			<td><FormInput /></td>
		</tr>
		<tr>
			<td>Prefilled</td>
			<td><FormInput defaultValue="it's like a default" /></td>
		</tr>
		<tr>
			<td>Year</td>
			<td><FormInput type="year" /></td>
		</tr>
		<tr>
			<td>Vanilla textarea</td>
			<td><FormInput type="text" /></td>
		</tr>
		</tbody></table>

		<h2>Form</h2>
		<Form />

		<h2>Form readonly</h2>
		<Form readOnly={true} recordId={0} />

		<h2>Actions</h2>
		<div><Actions onAction={type => alert(type)}/></div>

		<h2>Dialog</h2>
		<div><Dialog
			header="Out of the box example"
			onAction={type => alert(type)}>
			Hello, dialog!
		</Dialog></div>
		<p>&nbsp;</p>
		<div><Dialog
			header="No cancel, custom button"
			hasCancel={false}
			confirmLabel="Whatever"
			onAction={type => alert(type)}>
			Anything goes here, see: <Button>A button</Button>
		</Dialog></div>
	</div>,
	document.getElementById('discoverer')
);
