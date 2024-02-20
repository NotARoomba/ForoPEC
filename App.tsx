import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import Schedule from './src/pages/Schedule';
import {Animated} from 'react-native';
import Login from './src/pages/Login';
import {Appearance} from 'react-native';
import {callAPI, getData} from './src/utils/Functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import STATUS_CODES from './backend/models/status';
import Colibri from './src/pages/Colibri';
function getIcons(route: any, focused: any, color: any, size: any) {
  let iconName: string = 'home';

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Schedule') {
    iconName = 'list';
  } else if (route.name === 'Colibri') {
    iconName = 'feather'
  } else if(route.name === 'Profile') {
    iconName = 'user';
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.98)).current;

  const fadeIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scale]);

  const fadeOut = useCallback(
    (navigate: () => void) => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.98,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished) {
          navigate();
        }
      });
    },
    [fadeAnim, scale],
  );

  const listeners = ({navigation, route}: {navigation: any; route: any}) => ({
    tabPress: (e: {preventDefault: () => void}) => {
      e.preventDefault();
      if (
        navigation.getState().history[navigation.getState().history.length - 1]
          .key !== route.key
      ) {
        //also fade out tab bar if on colibri
        fadeOut(() => navigation.navigate(route.name));
      }
    },
    focus: (_e: any) => {
      fadeIn();
    },
  });
  const [logged, setlLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isDarkMode, setDarkMode] = useState(
    Appearance.getColorScheme() === 'dark',
  );
  const updateLogged = (v: boolean) => {
    setlLogged(v);
    if (!v) {
      AsyncStorage.removeItem('email');
    }
  };
  const updateDarkMode = (v: boolean) =>
    Appearance.setColorScheme(v ? 'light' : 'dark');
  useEffect(() => {
    // checks if user is valid in database and if not then kicks out
    // AsyncStorage.removeItem('email');
    // storeData('email', '+573104250018');
    async function checkIfLogin() {
      const number = await getData('email');
      if (!number) {
        setLoaded(true);
        return updateLogged(false);
      }
      const data = await callAPI('/users/' + number, 'GET');
      if (data.status == STATUS_CODES.NO_CONNECTION) updateLogged(true);
      else if (data.status !== STATUS_CODES.SUCCESS) updateLogged(false);
      else updateLogged(true);
      setLoaded(true);
    }
    checkIfLogin();
    Appearance.addChangeListener(appearance => {
      setDarkMode(appearance.colorScheme === 'dark');
    });
  }, []);
  // const onNavigationReady = () => {
  //   //SplashScreen.hide(); // just hide the splash screen after navigation ready
  // };
  return (
    <>{loaded && <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            display: logged ? 'flex' : 'none',
            backgroundColor: isDarkMode ? '#000000' : '#F0F3E0',
            position: 'absolute',
            bottom: 10,
            borderRadius: 10,
            width: 350,
            left: '50%',
            marginLeft: -175,
            height: 60,
            paddingBottom: 0,
            alignItems: 'center',
            shadowColor: '#000000',
            elevation: 0,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            borderTopWidth: 0,
          },
          headerTransparent: true,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            getIcons(route, focused, color, size),
          tabBarActiveTintColor: route.name === "Home" ? "#FDCB04" : route.name === "Schedule" ? "#166FE4" : route.name === "Colibri" ? "#D8011B" : "#551A8B",
          tabBarInactiveTintColor: isDarkMode ? 'gray' : '#171717',
        })}
        initialRouteName="Home"
        // eslint-disable-next-line react-native/no-inline-styles
        sceneContainerStyle={{
          zIndex: -900,
          backgroundColor: isDarkMode ? '#000000' : '#F0F3E0',
        }}>
        {logged ? (
          <Tab.Group>
            <Tab.Screen
              name="Home"
              listeners={listeners}
              options={{
                tabBarLabelStyle: {
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: 'bold',
                  paddingBottom: 5,
                },
              }}>
              {props => (
                <Home {...props} fadeAnim={fadeAnim} scale={scale} isDarkMode />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Schedule"
              listeners={listeners}
              options={{
                tabBarLabelStyle: {
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: 'bold',
                  paddingBottom: 5,
                },
              }}>
              {props => (
                <Schedule
                  {...props}
                  fadeAnim={fadeAnim}
                  scale={scale}
                  isDarkMode
                />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Colibri"
              listeners={listeners}
              options={{
                tabBarStyle: {
                  opacity: fadeAnim,
                  display: 'none'
                },
                tabBarLabelStyle: {
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: 'bold',
                  paddingBottom: 5,
                },
              }}>
              {props => (
                <Colibri
                  {...props}
                  fadeAnim={fadeAnim}
                  scale={scale}
                  isDarkMode
                />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Profile"
              listeners={listeners}
              options={{
                tabBarLabelStyle: {
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: 'bold',
                  paddingBottom: 5,
                },
              }}>
              {props => (
                <Profile
                  {...props}
                  fadeAnim={fadeAnim}
                  scale={scale}
                  isDarkMode
                  updateFunction={[updateDarkMode, updateLogged]}
                />
              )}
            </Tab.Screen>
          </Tab.Group>
        ) : (
          <Tab.Screen
            name="Login"
            listeners={listeners}
            options={{
              tabBarLabelStyle: {
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: 'bold',
                paddingBottom: 5,
              },
            }}>
            {props => (
              <Login
                {...props}
                fadeAnim={fadeAnim}
                scale={scale}
                isDarkMode
                updateFunction={[updateLogged]}
              />
            )}
          </Tab.Screen>
        )}
      </Tab.Navigator>
    </NavigationContainer>}</>
  );
}
