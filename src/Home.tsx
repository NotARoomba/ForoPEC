import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  useColorScheme,
} from 'react-native';

export default function Home() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView className="bg-neutral-900">
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <View className="flex justify-center align-middle">
        <Image
          source={require('../public/logo.png')}
          className="flex h-36 w-11/12 align-middle"
          resizeMode={'contain'}
        />
      </View>
    </SafeAreaView>
  );
}
