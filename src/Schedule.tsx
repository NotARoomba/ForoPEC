import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import Grid from './Grid';

export default function Schedule() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView className="bg-neutral-900">
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <View className="flex justify-center align-left mt-5">
        <Text className="justify-center text-neutral-50 font-bold m-auto mt-2 text-5xl">
          Schedule
        </Text>
        <Grid />
      </View>
    </SafeAreaView>
  );
}
