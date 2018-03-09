import {
    createAction
} from 'redux-actions';

export const FETCH_COLS = 'retrospected/board/cols/fetch';
export const FETCH_COLS_SUCCESS = 'retrospected/board/cols/fetch/success';

export const UPDATE_COLS = 'retrospected/board/cols/update';
export const UPDATE_COLS_SUCCESS = 'retrospected/board/cols/update/success';

export default function reducer(state = {
    cols: [],
    loading: false
}, action) {
    switch (action.type) {
    case FETCH_COLS:
        return {
            ...state,
            loading: true
        };
    case UPDATE_COLS:
        return {
            ...state,
            loading: true
        };
    case UPDATE_COLS_SUCCESS:
        return {
            ...state,
            loading: false,
            cols: action.payload.cols
        };
    case FETCH_COLS_SUCCESS:
        return {
            ...state,
            loading: false,
            cols: action.payload.cols
        };
    default:
        return state;
    }
}

export const updateCols = createAction(UPDATE_COLS, (cols) => ({
    cols
}));
export const updateColsSucess = createAction(UPDATE_COLS_SUCCESS);

export const fetchCols = createAction(FETCH_COLS);
export const fetchColsSuccess = createAction(FETCH_COLS_SUCCESS);
