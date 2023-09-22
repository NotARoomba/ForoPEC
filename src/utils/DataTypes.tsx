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
