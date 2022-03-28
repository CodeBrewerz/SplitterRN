import {
    Appbar,
    Title,
    useTheme,
    List,
    Avatar
} from 'react-native-paper';
import { StyleSheet, View, Text, FlatList } from "react-native";
import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
} from 'react-native-paper-tabs';
import { VictoryBar, VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import currency from 'currency.js';
import React from 'react';

const transactions = [
    {
        id: 1,
        transactionName: 'Shoppers Drug Mart',
        description: 'Simon paid for a purchase',
        amount: 55.32
    },
    {
        id: 2,
        transactionName: 'Loblaws',
        description: 'Amanda paid for a purchase',
        amount: 20.80
    },
    {
        id: 3,
        transactionName: 'Rogers Internet',
        description: 'Patrice paid for a purchase',
        amount: 100
    },
    {
        id: 4,
        transactionName: '2 - Shoppers Drug Mart',
        description: 'Simon paid for a purchase',
        amount: 55.32
    },
    {
        id: 5,
        transactionName: '2 - Loblaws',
        description: 'Amanda paid for a purchase',
        amount: 20.80
    },
    {
        id: 6,
        transactionName: '2 - Rogers Internet',
        description: 'Patrice paid for a purchase',
        amount: 100
    },
];

const ReconciliationItem = ({ avatarUrl, transactionName, description, amount }) => (
    <List.Item
        title={transactionName || 'Default Fallback'}
        description={description}
        left={_ => <Avatar.Image size={44} source={{ uri: avatarUrl || 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg' }} />}
        right={_ => <List.Subheader>{currency(amount).format()}</List.Subheader>}
    />
);

const ReconciliationItems = ({ transactions }) =>
(<List.Section style={{ padding: 10 }}>
    <FlatList
        data={transactions}
        renderItem={
            ({ item }) => (
                <ReconciliationItem
                    transactionName={item.transactionName}
                    description={item.description}
                    amount={item.amount}
                />
            )
        }
        keyExtractor={item => item.id}
    />
</List.Section>
);

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
                <VictoryLine data={data} x="quarter" y="earnings" />
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
            <Chart />
            <Tabs
                uppercase={false}
                showTextLabel={true}
                theme={theme}
                style={{ borderRadius: 30 }}
                onChangeIndex={(newIndex) => {
                    console.log(newIndex)
                }} // react on index change
            >
                <TabScreen label="Incoming">
                    <ReconciliationItems transactions={transactions} />
                </TabScreen>
                <TabScreen label="Outgoing">
                    <ReconciliationItems transactions={transactions} />
                </TabScreen>
                <TabScreen
                    label="Activity"
                >
                    <ReconciliationItems transactions={transactions} />
                </TabScreen>
            </Tabs>
        </View>
    )
};