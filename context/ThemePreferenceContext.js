import { atom, selector } from 'recoil';

export const PreferencesAtom = atom({
    key: 'preferences',
    default: true
});

export const userAuthAtom = atom({
    key: 'authAccessToken',
    default: {
        accessToken: null,
        info: null
    }
});

export const isLoggedIn = selector({
    key: 'isLoggedIn',
    get: ({ get }) => {
        const { accessToken } = get(userAuthAtom);
        return !!accessToken;
    }
})