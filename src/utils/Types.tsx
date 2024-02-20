import {Animated, Dimensions} from 'react-native';
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

export interface PillButtonProps {
  color: string;
  text: string;
  onPress: any;
  current: string;
}

export interface ObjectProps {
  body: Matter.Body;
  size: Matter.Vector;
  color: string
}

export interface BirdProps extends ObjectProps {
 
}

export const COLIBRI = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  FLOOR_WIDTH: 64,
  GAP_SIZE: 200, // gap between the two parts of the pipe
  PIPE_WIDTH: 100 // width of the pipe
}