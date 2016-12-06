/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';
/* @flow */

import { EventEmitter } from 'fbemitter';
import { List } from 'immutable';
import schema from '../schema';
import ApiCtrl from '../../api/api-controller';
import EventsConsts from '../components/EventsConsts';

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

	setData(newData: List<Object>, commit: boolean = true) {
		data = newData;
		emitter.emit(EventsConsts.CHANGE);
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

	addRecord(objRecord: Object) {
		ApiCtrl.createPlayerPromise(objRecord).then((e) => {
			if (e.isExisted) {
				emitter.emit(EventsConsts.USER_EXISTS);
				return false;
			}

			if (!e.token) {
				return false;
			}

			CRUDStore.setData(CRUDStore.getData().unshift(objRecord));
			emitter.emit(EventsConsts.CHANGE);

		});
	},

	deleteRecord(objRecord, recordId) {
		if (objRecord.email) {
			ApiCtrl.deletePlayerPromise(objRecord.email).then((e) => {
				if (e.ok) {
					CRUDStore.setData(CRUDStore.getData().remove(recordId));
					emitter.emit(EventsConsts.CHANGE);
				}
			});
		} else {
			emitter.emit(EventsConsts.DELETE_ERROR);
		}
	},

	updateRecord(objRecord, recordId) {
		let objUpdated = {};
		if (objRecord._id) {
			objUpdated.email = objRecord.email;
			objUpdated.name = objRecord.name;
			objUpdated.balance = objRecord.balance;
			objUpdated.wins = objRecord.wins;
		} else {
			objUpdated = objRecord;
		}
		if (objUpdated.email) {
			ApiCtrl.updatePlayerDataPromise(objUpdated).then((newRecord) => {
				if (newRecord) {
					CRUDStore.setData(CRUDStore.getData().set(recordId, newRecord));
					emitter.emit(EventsConsts.CHANGE);
				}
			});
		} else {
			emitter.emit(EventsConsts.UPDATE_ERROR);
		}
	}
};

export default CRUDStore