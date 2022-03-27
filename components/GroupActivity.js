import {
    Appbar,
    Title,
    useTheme,
} from 'react-native-paper';
import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
} from 'react-native-paper-tabs';

import React from 'react';
import { View, Text } from 'react-native';


export const GroupActivity = () => {
    const theme = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title="Group Activity" />
            </Appbar.Header>

            <Tabs
                uppercase={false}
                showTextLabel={true}
                theme={theme}
                style={{borderRadius: 30}}
                onChangeIndex={(newIndex) => {
                    console.log(newIndex)
                }} // react on index change
            >
                <TabScreen label="Incoming">
                    <View><Text>Incoming</Text></View>
                </TabScreen>
                <TabScreen label="Outgoing">
                    <Text>Outgoing</Text>
                </TabScreen>
                <TabScreen
                    label="Activity"
                >
                    <View>
                        <Title>Activity</Title>
                    </View>
                </TabScreen>
            </Tabs>
        </View>
    )
}