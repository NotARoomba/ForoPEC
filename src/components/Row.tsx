import React from 'react';
import {Text, View} from 'react-native';
import {Presenter} from '../utils/DataTypes';

export default function Row(presenter: Presenter) {
  return (
    <View className="flex flex-row min-h-max marker:mt-5 rounded-xl p-2 border-l-2 border-r-2 divide-x-2 divide-fl-dg border-fl-dg bg-neutral-200 shadow dark:shadow-none shadow-neutral-500 dark:divide-fl-dg dark:border-fl-g  dark:bg-neutral-800 ">
      <View className="p-2 w-1/3 flex flex-column">
        <Text className="flex flex-column text-center font-bold m-auto text-sm text-neutral-900 dark:text-neutral-300">
          {presenter.time}
        </Text>
      </View>
      <View className={"p-2 flex flex-column " + (presenter.projectName == "" ? 'w-2/3' : 'w-1/3')}>
        <Text className="flex flex-column text-center font-bold m-auto text-sm text-neutral-900 dark:text-neutral-300">
          {presenter.name}
        </Text>
      </View>
      {presenter.projectName !=="" && <View className="p-2 w-1/3 flex flex-column">
        <Text className="flex flex-column text-center font-bold m-auto text-sm text-neutral-900 dark:text-neutral-300">
          {presenter.projectName}
        </Text>
      </View>}
    </View>
  );
}
