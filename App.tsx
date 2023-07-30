import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './src/Home';
import Profile from './src/Profile';
import Schedule from './src/Schedule';
function getIcons(route: any, focused: any, color: any, size: any) {
  let iconName: string = 'home';

  if (route.name === 'Home') {
    iconName = focused ? 'ios-home' : 'ios-home-outline';
  } else if (route.name === 'Settings') {
    iconName = focused ? 'ios-list' : 'ios-list-outline';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
}
export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            getIcons(route, focused, color, size),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Schedule" component={Schedule} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
