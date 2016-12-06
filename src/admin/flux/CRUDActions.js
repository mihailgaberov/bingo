/**
 * Created by Mihail on 11/30/2016.
 */
'use strict';

/* @flow */

import CRUDStore from './CRUDStore';
import {List} from 'immutable';

const CRUDActions = {
	create(newRecord: Object) {
		CRUDStore.addRecord(newRecord);
	},

	delete(recordId: number) {
		let data: List<Object> = CRUDStore.getData();
		CRUDStore.deleteRecord(data.get(recordId), recordId);
	},

	updateRecord(recordId: number, newRecord: Object) {
		CRUDStore.updateRecord(newRecord, recordId);
	},

	updateField(recordId: number, key: string, value: string|number) {
		let record = CRUDStore.getData().get(recordId);
		record[key] = value;
		CRUDStore.setData(CRUDStore.getData().set(recordId, record));
	},

	_preSearchData: null,

	startSearching() {
		this._preSearchData = CRUDStore.getData();
	},

	search(e: Event) {
		const target = ((e.target: any): HTMLInputElement);
		const needle: string = target.value.toLowerCase();
		if (!needle) {
			CRUDStore.setData(this._preSearchData);
			return;
		}
		const fields = CRUDStore.getSchema().map(item => item.id);
		if (!this._preSearchData) {
			return;
		}
		const searchdata = this._preSearchData.filter(row => {
			for (let f = 0; f < fields.length; f++) {
				if (row[fields[f]] !== undefined) {
					if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
						return true;
					}
				}
			}
			return false;
		});
		CRUDStore.setData(searchdata, /* commit */ false);
	},

	_sortCallback(a: (string|number), b: (string|number), descending: boolean): number {
		let res: number = 0;
		if (typeof a === 'number' && typeof b === 'number') {
			res = a - b;
		} else {
			res = String(a).localeCompare(String(b));
		}
		return descending ? -1 * res : res;
	},

	sort(key: string, descending: boolean) {
		CRUDStore.setData(CRUDStore.getData().sort(
			(a, b) => this._sortCallback(a[key], b[key], descending)
		));
	},

};

export default CRUDActions