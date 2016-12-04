/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

/* @flow */

import { EventEmitter } from 'fbemitter';
import { List } from 'immutable';
import schema from '../schema';
import ApiCtrl from '../../api/api-controller';

let data: List<Object>;
const emitter = new EventEmitter();

const CRUDStore = {
	init(storage) {
		if (!storage) {
			let initialRecord = {};
			schema.forEach(item => initialRecord[item.id] = item.sample);
			data = List([initialRecord]);
		} else {
			data = List(storage);
		}
	},

	getData(): List<Object> {
		return data;
	},

	getSchema(): Array<Object> {
		return schema;
	},

	addRecord(newRecord: Object, commit: boolean = true) {
		if (commit) {
			ApiCtrl.createPlayerPromise(newRecord.name,
										newRecord.email,
										newRecord.password,
										newRecord.balance,
										newRecord.wins).then((e) => {
				console.log(e);
				if (e.isExisted){
					console.log('>>> Existing user - show dialog message.');
					return false;
				}

				if (!e.token) {
					console.log('>>> Creating failed.');
					return false;
				}

				// data.unshift(newRecord);
				CRUDStore.setData(CRUDStore.getData().unshift(newRecord));
				emitter.emit('change');

			});
		}
	},

	setData(newData: List<Object>, commit: boolean = true) {
		data = newData;
		/*if (commit && 'localStorage' in window) {
			localStorage.setItem('data', JSON.stringify(newData));
		}*/
		emitter.emit('change');
	},

	addListener(eventType: string, fn: Function) {
		emitter.addListener(eventType, fn);
	},

	getCount(): number {
		return data.count();
	},

	getRecord(recordId: number): ?Object {
		return data.get(recordId);
	},

};

export default CRUDStore