import React from 'react';
import {View, Image, Text, Appearance} from 'react-native';
import {Presenter} from '../utils/DataTypes';

export default function PresenterCard({image, name, projectName}: Presenter) {
  return (
    <View className="flex flex-column m-2 mx-3 w-48 min-h-64 rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 shadow dark:shadow-sm shadow-neutral-500">
      <Image
        defaultSource={
          Appearance.getColorScheme() === 'dark'
            ? require('../../public/user_light.png')
            : require('../../public/user_dark.png')
        }
        source={{uri: image}}
        className="flex h-28 w-11/12 align-middle justify-center m-auto rounded-xl"
        resizeMode={'contain'}
      />
      <Text className="flex text-center font-bold m-auto mt-0 text-base dark:text-neutral-50">
        {`${name}`}
      </Text>
      <View className="border-zinc-500 border-b-2 w-5/6 justify-center m-auto" />
      <Text className="flex break-all text-neutral-800 dark:text-neutral-300 text-center font-bold m-auto text-base p-2">
        {projectName}
      </Text>
    </View>
  );
}