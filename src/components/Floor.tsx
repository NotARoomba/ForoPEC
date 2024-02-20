import {View} from 'react-native';
import {ObjectProps} from '../utils/Types';

export default function Floor({body, size, color}: ObjectProps) {
  const x = body.position.x - size.x / 2;
  const y = body.position.y - size.y / 2;
  // console.log(body.bounds)
  return (
    <View
      style={{
        position: 'absolute',
        borderColor: 'black',
        borderTopWidth: 6,
        borderBottomWidth: 6,
        left: x,
        top: y,
        width: size.x,
        height: size.y,
        backgroundColor: color,
      }}
    />
  );
}
