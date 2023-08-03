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
  Alert,
} from 'react-native';
import {FunctionScreenProp, callAPI} from './DataTypes';
import prompt from '@powerdesigninc/react-native-prompt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

async function checkLogin(
  number: string,
  code: string,
  updateLogged: Function,
) {
  const check = await callAPI('/verify/check', 'POST', {number, code});
  console.log(check);
  if (!check.error) {
    await storeData(
      'number',
      number[0] === '+' ? number.slice(3, number.length) : number,
    );
    updateLogged(true);
    Alert.alert('Success!');
  } else {
    return Alert.alert('Error', check.msg);
  }
}

async function parseLogin(number: string, updateLogged: Function) {
  console.log(
    '/users/' + (number[0] === '+' ? number.slice(3, number.length) : number),
  );
  let exists = await callAPI(
    '/users/' + (number[0] === '+' ? number.slice(3, number.length) : number),
    'GET',
  );
  if (!exists.user && exists.error) {
    return Alert.alert('Error', exists.msg);
  }
  const res = await callAPI('/verify/send', 'POST', {number});
  if (!res.error) {
    return prompt(
      'Enter Code',
      'Enter the verification code that was sent to ' + number,
      async input => await checkLogin(number, input, updateLogged),
      'plain-text',
      '',
      'number-pad',
    );
  } else {
    return Alert.alert('Error', res.msg);
  }
}

export default function Login({
  fadeAnim,
  scale,
  isDarkMode,
  updateFunction,
}: FunctionScreenProp) {
  const [number, onChangeNumber] = React.useState('');
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
            placeholderTextColor={'#737373'}
            className="flex justify-center align-middle m-auto h-auto p-1 pl-3 text-3xl border dark:border-neutral-200 mt-5 w-72 text-center rounded-xl dark:text-neutral-50"
          />
          <TouchableOpacity
            onPress={() => parseLogin(number, updateFunction[0])}
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
