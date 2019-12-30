/**
 * Created by Mihail on 9/24/2016.
 */

'use strict';

import PubSubService from '../../../src/events/pubsub-service';
import { expect } from 'chai';

describe('PubSub Service', () => {

	const pubsub = new PubSubService();

	test('Should initialize topics object', () => {
		expect(pubsub.topics).not.to.be.undefined;
		expect(pubsub.topics).to.be.object;
	});

	test('Should initialize hOP variable', () => {
		expect(pubsub.hOP).not.to.be.undefined;
	});

	test('Should publish events with topic and info', () => {
		pubsub.topics['test'] = [()=>{}];
		pubsub.publish('test', {});

		expect(pubsub.topics['test']).not.to.be.undefined;
		expect(pubsub.topics['test']).not.to.be.calledOnce;
	});

	test('Should subscribe to events with topic and attach a listener', () => {
		const listener = () => {};
		pubsub.subscribe('eventName', listener);
		expect(pubsub.topics['eventName']).not.to.be.undefined;
		pubsub.publish('eventName', {});
		expect(listener).to.be.calledOnce;
	});

	test('Should remove subscriptions', () => {
		const removeMe = () => {};
		pubsub.subscribe('removeMeEvent', removeMe);
		expect(pubsub.topics['removeMeEvent']).not.to.be.undefined;
		pubsub.remove('removeMeEvent');
		expect(pubsub.topics['removeMeEvent'][0]).not.to.be.equal(removeMe);
	});
});