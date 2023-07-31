import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './src/Home';
import Profile from './src/Profile';
import Schedule from './src/Schedule';
import {Button, View} from 'react-native';
function getIcons(route: any, focused: any, color: any, size: any) {
  let iconName: string = 'home';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Schedule') {
    iconName = focused ? 'list' : 'list-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
}
// function MyTabBar(navigation: any) {
//   return (
//     <View>
//       <ImageButton />
//       <ImageButton />
//       <ImageButton />
//     </View>
//   );
// }
export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            backgroundColor: '#000000',
            outline: 0,
            position: 'absolute',
            bottom: 15,
            padding: 5,
            margin: 10,
            borderRadius: 10,
            maxWidth: 350,
            left: 20,
            right: 20,
          },
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            getIcons(route, focused, color, size),
          tabBarActiveTintColor:
            route.name === 'Home'
              ? '#FECB02'
              : route.name === 'Schedule'
              ? '#073E87'
              : '#D8011B',
          tabBarInactiveTintColor: 'gray',
        })}
        initialRouteName="Home"
        sceneContainerStyle={{backgroundColor: '#171717'}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Schedule" component={Schedule} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
