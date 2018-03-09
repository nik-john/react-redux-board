import { takeEvery } from 'redux-saga';
import { AUTO_LOGIN, LOGIN, LOGOUT, CHANGE_LANGUAGE } from '../state/user';
import {
    AUTO_JOIN,
    LEAVE_SESSION,
    CREATE_SESSION,
    RECEIVE_SESSION_NAME,
    RENAME_SESSION } from '../state/session';
import { ADD_POST, LIKE } from '../state/posts';
import { FETCH_COLS, UPDATE_COLS } from '../state/board';

import {
    onLogout,
    onChangeLanguage,
    onLeaveSession,
    onAutoLogin,
    onLogin } from './user';
import { onAddPost, onLike } from './posts';
import { onAutoJoin, onCreateSession, onRenameSession } from './session';
import { onLocationChange } from './router';
import { onUpdateCols, onFetchCols } from './board';
export default function* rootSaga() {
    console.log('*********************');
    console.log(onLocationChange);
    console.log('*********************');
    yield [
        takeEvery(AUTO_LOGIN, onAutoLogin),
        takeEvery(AUTO_JOIN, onAutoJoin),
        takeEvery(RECEIVE_SESSION_NAME, onRenameSession),
        takeEvery(RENAME_SESSION, onRenameSession),
        takeEvery(LOGIN, onLogin),
        takeEvery(LOGOUT, onLogout),
        takeEvery(CHANGE_LANGUAGE, onChangeLanguage),
        takeEvery(LEAVE_SESSION, onLeaveSession),
        takeEvery(ADD_POST, onAddPost),
        takeEvery(CREATE_SESSION, onCreateSession),
        takeEvery(LIKE, onLike),
        takeEvery('@@router/LOCATION_CHANGE', onLocationChange),
        takeEvery(UPDATE_COLS, onUpdateCols),
        takeEvery(FETCH_COLS, onFetchCols)
    ];
}
