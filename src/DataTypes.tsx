import AsyncStorage from '@react-native-async-storage/async-storage';
import {Animated} from 'react-native';

export interface SalonAPI {
  name: string;
  color: string;
}
export interface Presenter {
  name: string;
  projectName: string;
  image: string;
  salon: SalonAPI;
  time: string;
}

export interface Salon {
  name: string;
  color: string;
  presenters: Presenter[];
}

export interface User {
  name: string;
  salon: string;
  admin: boolean;
  number: string;
}

export interface ScreenProp {
  fadeAnim: Animated.Value;
  scale: Animated.Value;
  isDarkMode: boolean;
}
export interface FunctionScreenProp {
  fadeAnim: Animated.Value;
  scale: Animated.Value;
  isDarkMode: boolean;
  updateFunction: Function[];
}

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const API = 'https://foropec2023-api.notaroomba.xyz';

export async function callAPI(
  endpoint: string,
  method: string,
  body: Object = {},
) {
  return method === 'POST'
    ? await (
        await fetch(API + endpoint, {
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      ).json()
    : await (
        await fetch(API + endpoint, {
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
      ).json();
}
