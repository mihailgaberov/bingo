import PubSubService from '../../../src/events/pubsub-service';

describe('PubSub Service', () => {

	const pubsub = new PubSubService();

	test('Should initialize topics object', () => {
		expect(pubsub.topics).toBeDefined();
		expect(typeof pubsub.topics).toBe('object');
	});

	test('Should initialize hOP variable', () => {
		expect(pubsub.hOP).toBeDefined();
	});

	test('Should publish events with topic and info', () => {
		pubsub.topics['test'] = [jest.fn()];
		pubsub.publish('test', {});
		expect(pubsub.topics['test']).toBeDefined();
		expect(pubsub.topics['test'][0]).toHaveBeenCalledTimes(1);
	});

	test('Should subscribe to events with topic and attach a listener', () => {
		const listener = jest.fn();
		pubsub.subscribe('eventName', listener);
		expect(pubsub.topics['eventName']).toBeDefined();
		pubsub.publish('eventName', {});
		expect(listener).toHaveBeenCalledTimes(1);
	});

	test('Should remove subscriptions', () => {
		const removeMe = () => {};
		pubsub.subscribe('removeMeEvent', removeMe);
		expect(pubsub.topics['removeMeEvent']).toBeDefined();
		pubsub.remove('removeMeEvent');
		expect(pubsub.topics['removeMeEvent'][0]).not.toEqual(removeMe);
	});
});
