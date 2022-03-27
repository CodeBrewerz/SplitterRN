/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { RecoilRoot } from 'recoil';
import { name as appName } from './app.json';

const Index = () => (
    <RecoilRoot>
        <App />
    </RecoilRoot>
);
AppRegistry.registerComponent(appName, () => Index);
