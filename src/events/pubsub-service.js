/**
 * Created by mgab on 20/09/16.
 * Used pubsub pattern - https://davidwalsh.name/pubsub-javascript
 */

'use strict';

class PubSubService {
    constructor() {
        this.topics = {};
        this.hOP = this.topics.hasOwnProperty;
        this.idx = 0;
    }

    subscribe(topic, listener) {
        if (!this.hOP.call(this.topics, topic))
            this.topics[topic] = [];


        this.idx = this.topics[topic].push(listener) -1;
    }

    remove(topic) {
        delete this.topics[topic][this.idx];
    }

    publish(topic, info) {
        if(!this.hOP.call(this.topics, topic))
            return;

        this.topics[topic].forEach((item) => {
            item(info !== undefined ? info : {});
        });
    }
}

export default PubSubService;