import {View} from 'react-native';
import {BirdProps} from '../utils/Types';

export default function Bird({body, size, color}: BirdProps) {
  const x = body.position.x - size.x / 2;
  const y = body.position.y - size.y / 2;
  return (
    <View
      style={{
        position: 'absolute',
        borderColor: 'black',
        borderWidth: 4,
        left: x,
        top: y,
        width: size.x,
        height: size.y,
        backgroundColor: color,
      }}
    />
  );
}
