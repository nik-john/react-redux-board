import { put } from 'redux-saga/effects';
import uuid from 'node-uuid';
import {
    updateColsSucess,
    fetchColsSuccess
} from '../state/board';

export function* onUpdateCols(action) {
    const cols = yield action.payload.cols.map((col) => {
        let updatedCol = col;
        if (!col.type) {
            updatedCol = { ...col, type: uuid.v1() };
        }
        return updatedCol;
    });
    localStorage.setItem('cols', JSON.stringify(cols));
    yield put(updateColsSucess({ cols }));
}

export function* onFetchCols() {
    let cols;
    if (localStorage.getItem('cols')) {
        cols = JSON.parse(localStorage.getItem('cols'));
    } else {
        cols = [];
    }
    yield put(fetchColsSuccess({
        cols
    }));
}
