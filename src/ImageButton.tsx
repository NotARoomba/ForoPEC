import React from 'react';
import {Image, Pressable} from 'react-native';

export default function ImageButton(
  imgPath: any,
  navigation: any,
  toNavigate: any,
) {
  return (
    <Pressable onPress={() => navigation.navigate(toNavigate)}>
      <Image
        source={require(imgPath)}
        className="flex h-12 w-12 align-middle justify-center"
        resizeMode={'contain'}
      />
    </Pressable>
  );
}
