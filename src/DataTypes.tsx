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
