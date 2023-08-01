import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  useColorScheme,
  Text,
} from 'react-native';

export default function Profile() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView className="bg-neutral-900">
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <View className="flex justify-center align-left mt-5">
        <Image
          source={require('../public/person1.jpg')}
          className="flex h-32 w-32 align-middle justify-center m-auto bg-neutral-600 rounded-full"
          resizeMode={'contain'}
        />
        <Text className="justify-center text-neutral-50 font-bold m-auto mt-4 text-3xl">
          Nathan A
        </Text>
        <Text className="justify-center text-neutral-400 font-bold m-auto mt-0 text-xl">
          Salon 2B
        </Text>
        <Image
          source={require('../public/qrcode.png')}
          className="flex h-60 w-60 align-middle justify-center m-auto mt-10 bg-neutral-600 rounded"
          resizeMode={'contain'}
        />
      </View>
    </SafeAreaView>
  );
}
