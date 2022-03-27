import {
    Appbar,
    Title,
    useTheme,
} from 'react-native-paper';
import { StyleSheet, View, Text } from "react-native";
import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
} from 'react-native-paper-tabs';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

import React from 'react';


const Chart = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30
        }
    });
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];
    return (
        <View style={styles.container}>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>
        </View>
    )
}
export const GroupActivity = () => {
    const theme = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title="Group Activity" />
            </Appbar.Header>
            <Chart  />
            <Tabs
                uppercase={false}
                showTextLabel={true}
                theme={theme}
                style={{ borderRadius: 30}}
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