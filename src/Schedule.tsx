import React from 'react';
import {SafeAreaView, StatusBar, View, Text, Animated} from 'react-native';
import Grid from './Grid';
import {ScreenProp} from './DataTypes';

export default function Schedule({fadeAnim, scale, isDarkMode}: ScreenProp) {
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View className="flex justify-center align-left mt-5">
          <Text className="justify-center font-bold m-auto mt-2 text-5xl dark:text-neutral-50">
            Schedule
          </Text>
          <Grid />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
