jest.unmock('../../state');
jest.unmock('../../state/user');
jest.unmock('../../state/posts');
jest.unmock('../../state/session');
jest.unmock('../../state/actions');
jest.unmock('../../state/invite');
jest.unmock('../../state/modes');
jest.unmock('../../state/board');
jest.unmock('../../sagas');
jest.unmock('../../sagas/posts');
jest.unmock('../../sagas/session');
jest.unmock('../../sagas/user');
jest.unmock('../../sagas/board');
jest.unmock('../../i18n/languages.json');

import moment from 'moment';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../../state';
import sagas from '../../sagas';
import createSagaMiddleware from 'redux-saga';

import { loginSuccess, changeLanguage } from '../../state/user';
import { createSessionSuccess,
    receiveClientList,
    renameSession,
    loadPreviousSessions
} from '../../state/session';
import { toggleSummaryMode,
    openDrawer
} from '../../state/modes';
import {
    addPost
} from '../../state/posts';
import {
    updateCols
} from '../../state/board';
export const getStore = () => {
    const initialState = {};
    const middlewares = [];
    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);

    const createStoreWithMiddleware = applyMiddleware(...middlewares);

    const finalCreateStore = createStoreWithMiddleware(createStore);
    const store = finalCreateStore(reducers, initialState);
    sagaMiddleware.run(sagas);

    return store;
};

export default () => {
    const store = getStore();

    store.dispatch(loginSuccess('Antoine'));
    store.dispatch(changeLanguage('fr'));
    store.dispatch(createSessionSuccess({ sessionId: 'ABCD' }));
    store.dispatch(receiveClientList(['Zsolt', 'James', 'Stuart']));
    // store.dispatch(renameSession('FT1.1 Retro'));
    store.dispatch(loadPreviousSessions([
        { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
        { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
        { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() }
    ]));
    store.dispatch(toggleSummaryMode());
    store.dispatch(openDrawer());
    store.dispatch(addPost('aaa', 'Nicolas Sarkozy'));
    store.dispatch(addPost('aaa', 'Bruno Lemaire'));
    store.dispatch(addPost('bbb', 'François Hollande'));
    store.dispatch(addPost('bbb', 'Cécile Duflot'));
    store.dispatch(addPost('ccc', 'Emmanuel Macron'));
    store.dispatch(addPost('ccc', 'Manuel Valls'));
    store.dispatch(updateCols([
        { type: 'aaa', color: 'red', question: 'Sample question 1' },
        { type: 'bbb', color: 'green', question: 'Sample question 2' },
        { type: 'ccc', color: 'blue', question: 'Sample question 3' }
    ]));

    return store.getState();
};
