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
import { PreferencesAtom } from './context/ThemePreferenceContext';
import {
  View,
} from 'react-native';

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
    <View >
      <Header title="Home" />
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


function SettingsScreen() {
  return (
    <View>
      <Header title="Settings" />
      <ThemeToggleListItem />
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
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};


export default App;
