import {Animated} from 'react-native';
import User from '../../backend/models/user';
import {CodeScanner} from 'react-native-vision-camera';

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

export interface QRCameraProps {
  user: User;
  cameraPerms: boolean;
  codeScanner: CodeScanner;
  cameraOpen: boolean;
  setCameraOpen: (open: boolean) => void;
}

export interface Salon {
  name: string;
  color: string;
  presenters: Presenter[];
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
