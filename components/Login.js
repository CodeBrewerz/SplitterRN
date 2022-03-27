import React, { useState, useEffect } from 'react';
import {
    Alert,
} from 'react-native';
import Auth0 from 'react-native-auth0';
import { Avatar, List } from 'react-native-paper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAuthAtom } from '../context/ThemePreferenceContext';

const AUTH0_CREDENTIALS = {
    clientId: "PwBGZzX1QuaUlNCbyUVff8uEsIgf62im",
    domain: "dev-ezyhf71g.us.auth0.com",
    audience: "https://split-bills-api-gateway-111-0whh5y9mzd71g.apigateway.split-bills-4f198.cloud.goog"
};

export const LoginListItem = () => {
    const auth0 = new Auth0(AUTH0_CREDENTIALS);
    const [accessToken, setAccessToken] = useRecoilState(userAuthAtom);
    useEffect(() => {
        console.log('accessToken: ', accessToken);
    }, [accessToken]);

    const onLogin = async () => {
        const credentials = await auth0.webAuth
            .authorize({
                scope: 'openid profile email',
                audience: AUTH0_CREDENTIALS.audience
            });
        const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });

        setAccessToken({ accessToken: credentials.accessToken, info: userInfo });
    }
    
    return (
        <List.Item
            title="Sign In"
            onPress={onLogin}
        />
    );
}

export const LoggedInListItem = () => {
    const { info } = useRecoilValue(userAuthAtom);
    return (
        <List.Item
            title={info.name || 'Default Fallback'}
            description={info.email}
            left={_ => <Avatar.Image size={44} source={{ uri: info.picture || 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg' }} />}
            right={_ => <List.Icon icon="chevron-right" />}
        />
    );
}

export const LogoutListItem = () => {
    const auth0 = new Auth0(AUTH0_CREDENTIALS);
    const onLogout = () => {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                Alert.alert('Logged out!');
                setAccessToken(null);
            })
            .catch(error => {
                console.log('Log out cancelled');
            });
    };

    return (
        <List.Item
            title="Logout"
            onPress={onLogout}
        />
    );
}
