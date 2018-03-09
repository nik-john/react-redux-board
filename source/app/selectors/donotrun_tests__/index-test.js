jest.unmock('../index');
jest.unmock('./getState');

import moment from 'moment';
import getState from './getState';
import {
    getPosts,
    getSessionId,
    getSummaryMode,
    getCurrentUser,
    getCurrentLanguage,
    getClients,
    getSessionName,
    getSavedSessions,
    isInviteDialogOpen,
    isDrawerOpen,
    shouldDisplayDrawerButton,
    getSavedSessionsByDate,
    getCurrentLanguageInfo,
    getCols
} from '../index';

const state = getState();

console.log(state);

describe('Selectors - Index', () => {
    it('getPosts', () => {
        expect(getPosts(state).length).toBe(6);
    });

    it('getSessionId', () => {
        expect(getSessionId(state)).toBe('ABCD');
    });

    it('getSummaryMode', () => {
        expect(getSummaryMode(state)).toBe(true);
    });

    it('getCurrentUser', () => {
        expect(getCurrentUser(state)).toEqual('Antoine');
    });

    it('getCurrentLanguage', () => {
        expect(getCurrentLanguage(state)).toBe('fr');
    });

    it('getClients', () => {
        expect(getClients(state)).toEqual(['Zsolt', 'James', 'Stuart']);
    });

    it('getSessionName', () => {
        expect(getSessionName(state)).toBe('FT1.1 Retro');
    });

    it('getSavedSessions', () => {
        expect(getSavedSessions(state)).toEqual([
            { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
            { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() },
            { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() }
        ]);
    });

    it('isInviteDialogOpen', () => {
        expect(isInviteDialogOpen(state)).toBe(false);
    });

    it('isDrawerOpen', () => {
        expect(isDrawerOpen(state)).toBe(true);
    });

    it('shouldDisplayDrawerButton', () => {
        expect(shouldDisplayDrawerButton(state)).toBe(true);
    });

    it('getSavedSessionsByDate', () => {
        expect(getSavedSessionsByDate(state)).toEqual([
            { name: 'Retro 1', lastJoin: moment('2014-04-19').unix() },
            { name: 'Retro 3', lastJoin: moment('1982-11-01').unix() },
            { name: 'Retro 2', lastJoin: moment('1952-04-24').unix() }
        ]);
    });

    it('getCurrentLanguageInfo', () => {
        expect(getCurrentLanguageInfo(state).name).toBe('Français');
    });

    it('getCols', () => {
        expect(getCols(state).length).toBe(3);
    });
});
