import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

export interface Presenter {
  name: string;
  projectName: string;
  image: ImageSourcePropType;
}

export interface Salon {
  name: string;
  color: string;
  presenters: Presenter[];
}
