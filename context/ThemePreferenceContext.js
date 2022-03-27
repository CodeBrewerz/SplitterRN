import { atom } from 'recoil';

export const PreferencesAtom = atom({
    key: 'preferences',
    default: true
});

export const authAccessTokenAtom = atom({
    key: 'authAccessToken',
    default: null
})