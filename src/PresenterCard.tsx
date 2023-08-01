import React from 'react';
import {View, Image, Text} from 'react-native';
import {Presenter} from './DataTypes';

export default function PresenterCard({image, name, projectName}: Presenter) {
  return (
    <View className="flex flex-column m-5 mb-0 w-32 h-64 rounded-xl bg-neutral-800">
      <Image
        source={image}
        className="flex h-28 w-28 align-middle justify-center m-2 rounded-xl"
        resizeMode={'contain'}
      />
      <Text className="flex text-neutral-300 text-center font-bold m-auto mt-0 text-base">
        {`${name}`}
      </Text>
      <View className="border-white border-b-2 w-5/6 justify-center m-auto" />
      <Text className="flex text-neutral-300 text-center font-bold m-auto text-base">
        {projectName}
      </Text>
    </View>
  );
}
