import React, { useState, useEffect } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Auth0 from 'react-native-auth0';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { authAccessTokenAtom } from '../context/ThemePreferenceContext';

const AUTH0_CREDENTIALS = {
    clientId: "PwBGZzX1QuaUlNCbyUVff8uEsIgf62im",
    domain: "dev-ezyhf71g.us.auth0.com",
    audience: "https://split-bills-api-gateway-111-0whh5y9mzd71g.apigateway.split-bills-4f198.cloud.goog"
};
const auth0 = new Auth0(AUTH0_CREDENTIALS);

export const Login = () => {
    const [accessToken, setAccessToken] = useRecoilState(authAccessTokenAtom);
    useEffect(() => {
        console.log('accessToken: ', accessToken);
    }, [accessToken]);

    const onLogin = async () => {
        const credentials = await auth0.webAuth
            .authorize({
                scope: 'openid profile email',
                audience: AUTH0_CREDENTIALS.audience
            });
        setAccessToken(credentials.accessToken);
    }

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

    let loggedIn = accessToken !== null;
    return (
        <View style={styles.container}>
            <Text style={styles.header}> Auth0Sample - Login </Text>
            <Text>You are{loggedIn ? ' ' : ' not '}logged in. </Text>
            <Button onPress={loggedIn ? onLogout : onLogin}
                title={loggedIn ? 'Log Out' : 'Log In'} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});