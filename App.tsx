import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import Home from './src/Home';
import Profile from './src/Profile';
import Schedule from './src/Schedule';
import {Appearance} from 'react-native';
function getIcons(route: any, focused: any, color: any, size: any) {
  let iconName: string = 'home';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home';
  } else if (route.name === 'Schedule') {
    iconName = focused ? 'list' : 'list';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'user' : 'user';
  }
  return (
    <Feather
      name={iconName}
      size={size}
      color={color}
      className="align-center"
    />
  );
}
export default function App() {
  const Tab = createBottomTabNavigator();
  const [colorScheme, setColorScheme] = React.useState(
    Appearance.getColorScheme(),
  );

  useEffect(() => {
    Appearance.addChangeListener(({colorScheme}) =>
      setColorScheme(colorScheme),
    );
  }, []);

  const isDarkMode = colorScheme === 'dark';
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#000000' : '#BCCFDC',
            outline: 0,
            position: 'absolute',
            bottom: 5,
            margin: 10,
            borderRadius: 10,
            maxWidth: 350,
            left: 20,
            right: 20,
            height: 60,
            paddingBottom: 0,
            alignItems: 'center',
            borderTopWidth: 0,
          },
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            getIcons(route, focused, color, size),
          tabBarActiveTintColor: isDarkMode ? '#16BA65' : '#026D36',
          tabBarInactiveTintColor: isDarkMode ? 'gray' : '#171717',
        })}
        initialRouteName="Home"
        // eslint-disable-next-line react-native/no-inline-styles
        sceneContainerStyle={{
          backgroundColor: isDarkMode ? '#171717' : '#d5ecfa',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Inter',
              fontSize: 14,
              fontWeight: 'bold',
              paddingBottom: 5,
            },
          }}
        />
        <Tab.Screen
          name="Schedule"
          component={Schedule}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Inter',
              fontSize: 14,
              fontWeight: 'bold',
              paddingBottom: 5,
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Inter',
              fontSize: 14,
              fontWeight: 'bold',
              paddingBottom: 5,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
