/* eslint max-len:0 */

jest.unmock('../board');

import systemUnderTest, {
FETCH_COLS,
FETCH_COLS_SUCCESS,
UPDATE_COLS,
UPDATE_COLS_SUCCESS,
updateCols,
updateColsSucess,
fetchCols,
fetchColsSuccess
} from '../board';

describe('State - Board', () => {
    let state;
    let cols;

    beforeEach(() => {
        state = systemUnderTest(undefined, { type: '' });
        cols = [
            { type: 'aaa', color: 'red', question: 'Sample question 1' },
            { type: 'bbb', color: 'green', question: 'Sample question 2' },
            { type: 'ccc', color: 'blue', question: 'Sample question 3' }
        ];
    });
    it('Should have a list of action constants', () => {
        expect(FETCH_COLS.length).not.toBeLessThan(1);
        expect(FETCH_COLS_SUCCESS.length).not.toBeLessThan(1);
        expect(UPDATE_COLS.length).not.toBeLessThan(1);
        expect(UPDATE_COLS_SUCCESS.length).not.toBeLessThan(1);
    });
    it('Should have a list of actions', () => {
        expect(updateCols.length).not.toBe(null);
        expect(updateColsSucess.length).not.toBe(null);
        expect(fetchCols.length).not.toBe(null);
        expect(fetchColsSuccess.length).not.toBe(null);
    });
    it('Should start with an empty array of cols', () => {
        expect(state).toEqual({
            cols: [],
            loading: false
        });
    });

    it('Should set the loading flag to true when fetch is triggered', () => {
        state = systemUnderTest(state, { type: FETCH_COLS });
        expect(state).toEqual({
            loading: true,
            cols: []
        });
    });

    it('Should add the col list fetched from LS to state', () => {
        state = systemUnderTest(state, { type: FETCH_COLS_SUCCESS,
            payload: {
                cols
            }
        });
        expect(state.cols.length).toBe(3);
        expect(state.cols[0].type).toEqual('aaa');
        expect(state.loading).toEqual(false);
    });

    it('Should update the col list to LS and then to state', () => {
        state = [...state, cols];
        state = systemUnderTest(state, { type: UPDATE_COLS_SUCCESS,
            payload: {
                cols: [{ type: 'xyz', color: 'grey', question: 'Sample question X' }]
            }
        });
        expect(state.cols.length).toBe(1);
        expect(state.cols[0].type).toEqual('xyz');
        expect(state.cols[0].question).toEqual('Sample question X');
        expect(state.loading).toEqual(false);
    });

    it('Should set the loading flag to true when update is triggered', () => {
        state = systemUnderTest(state, { type: UPDATE_COLS, payload: {} });
        expect(state).toEqual({
            cols: [],
            loading: true
        });
    });
});
