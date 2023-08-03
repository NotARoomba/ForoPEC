import React from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Appearance,
  Image,
} from 'react-native';
import {ScreenProp} from './DataTypes';

const API = 'https://foropec2023-api.notaroomba.xyz';

async function parseLogin(number: string) {
  let res = await (
    await fetch(API + '/verify/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number,
      }),
    })
  ).json();
  if (res.status === 200) {
    console.log('AY', res.body);
  } else {
    console.log('sads', res.body);
  }
}

export default function Login({fadeAnim, scale, isDarkMode}: ScreenProp) {
  const [number, onChangeNumber] = React.useState('');
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <View className="flex justify-center align-left mt-0">
          <Image
            source={
              Appearance.getColorScheme() === 'dark'
                ? require('../public/logo.png')
                : require('../public/logoDark.png')
            }
            className="flex h-36 w-11/12 align-middle justify-center m-auto bg-inherit"
            resizeMode={'contain'}
          />
          <TextInput
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Phone Number"
            keyboardType="number-pad"
            className="flex justify-center align-middle m-auto h-auto p-1 pl-5 pb-1 text-2xl border mt-5 w-72 text-left text- rounded-xl dark:text-neutral-50"
          />
          <TouchableOpacity
            onPress={() => parseLogin(number)}
            className="flex justify-center align-middle p-2 bg-neutral-900 dark:bg-neutral-100 w-24 rounded-xl m-auto mt-4">
            <Text className="flex align-middle font-bold m-auto text-xl text-neutral-50 dark:text-neutral-900">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
