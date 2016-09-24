/**
 * Created by Mihail on 9/24/2016.
 */

'use strict';

import assert from 'assert';
import PubSubService from '../../src/events/pubsub-service';
import { expect } from 'chai';

describe('PubSub Service', () => {

	const pubsub = new PubSubService();

	it ('Should initialize topics object', () => {
		expect(pubsub.topics).not.to.be.undefined;
		expect(pubsub.topics).to.be.object;
	});

	it ('Should initialize hOP variable', () => {
		expect(pubsub.hOP).not.to.be.undefined;
	});

	it ('Should publish events with topic and info', () => {
		pubsub.topics['test'] = [()=>{}];
		pubsub.publish('test', {});

		expect(pubsub.topics['test']).not.to.be.undefined;
		expect(pubsub.topics['test']).not.to.be.calledOnce;
	});

	it ('Should subscribe to events with topic and attach a listener', () => {
		const listener = () => {};
		pubsub.subscribe('eventName', listener);
		expect(pubsub.topics['eventName']).not.to.be.undefined;
		pubsub.publish('eventName', {});
		expect(listener).to.be.calledOnce;
	});
});