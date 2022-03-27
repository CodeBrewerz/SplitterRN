import React from 'react';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  useTheme, Appbar, Switch,
  Text,
  List,
} from 'react-native-paper';
import merge from 'deepmerge';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedIn, PreferencesAtom, userAuthAtom } from './context/ThemePreferenceContext';
import {
  View,
} from 'react-native';
import { GroupActivity } from './components/GroupActivity';
import { TabsExample } from './components/TabsExample';
import { LoggedInListItem, Login, LoginListItem, LogoutListItem } from './components/Login';

const ThemeToggle = () => {
  const theme = useTheme();
  const [isThemeDark, toggleTheme] = useRecoilState(PreferencesAtom);

  return (
    <Switch
      color={'red'}
      value={isThemeDark}
      onValueChange={() => toggleTheme(prev => !prev)}
    />
  )

}

const Header = ({ title }) => {

  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

const ThemeToggleListItem = () => (
  <List.Item
    title="Enable Dark Theme"
    left={props => <List.Icon {...props} icon="weather-night" />}
    right={_ => <ThemeToggle />}
  />
)


const AuthenticatedSettingsScreen = () => {
  const authenticatedListItems = [<LoggedInListItem />, <ThemeToggleListItem />, <LogoutListItem />];

  return (
    <List.Section>
      {authenticatedListItems}
    </List.Section>
  );
}

const UnauthenticatedSettingsScreen = () => {
  const unauthenticatedListItems = [<LoginListItem />, <ThemeToggleListItem />];

  return (
    <List.Section>
      {unauthenticatedListItems}
    </List.Section>
  );
}

function SettingsScreen() {
  const authenticated = useRecoilValue(isLoggedIn);
  return (
    <View>
      <Header title="Settings" />
      {authenticated ? <AuthenticatedSettingsScreen /> : <UnauthenticatedSettingsScreen />}
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const App = () => {
  const isThemeDark = useRecoilValue(PreferencesAtom);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Group" component={GroupActivity} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};


export default App;
