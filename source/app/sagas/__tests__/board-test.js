jest.unmock('./testSaga');
jest.unmock('../board');
jest.unmock('../../state/board');
jest.unmock('../../selectors');

import test from './testSaga';
import { onFetchCols, onUpdateCols } from '../board';
import {
    fetchColsSuccess,
    updateColsSucess
} from '../../state/board';
import { put } from 'redux-saga/effects';

describe('Sagas - board', () => {
    const cols = [
        { type: 'aaa', color: 'red', question: 'Sample question 1' },
        { type: 'bbb', color: 'green', question: 'Sample question 2' },
        { type: 'ccc', color: 'blue', question: 'Sample question 3' }
    ];
    beforeEach(() => {
        window.localStorage.setItem('cols', JSON.stringify(cols));
    });
    afterEach(() => {
        window.localStorage.removeItem('cols');
    });

    it('When cols are fetched from LS', () => {
        test(onFetchCols(),
            (result, andReturns, andThen) => {
                expect(result()).toEqual(put(
                            fetchColsSuccess({ cols: cols.map((col, i) => {
                                let updatedCol = col;
                                if (!col.type) {
                                    updatedCol = { ...col, type: i };
                                }
                                return updatedCol;
                            }) })
                        )
                    );
                expect(result()).toEqual(put(fetchColsSuccess(
                    { cols }
                )));
                andReturns(cols);
                andThen();
            }
        );
    });
    it('When cols are updated to LS', () => {
        test(onUpdateCols({ payload: { cols: [cols[1]] } }),
            (result, andReturns, andThen) => {
                expect(result().length).toEqual(1);
                andReturns(
                    [{ type: 'bbb', color: 'green', question: 'Sample question 2' }]
                );
                expect(result()).toEqual(put(updateColsSucess(
                    { cols: [{ type: 'bbb', color: 'green', question: 'Sample question 2' }] }
                )));
                andThen();
            }
        );
    });
});
