import React, {useEffect, useState} from 'react';
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
  ScrollView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {FunctionScreenProp, callAPI, storeData} from './DataTypes';
import prompt from '@powerdesigninc/react-native-prompt';
// import {CountryPicker} from 'react-native-country-codes-picker';

async function checkLogin(
  number: string,
  code: string,
  updateLogged: Function,
) {
  const check = await callAPI('/verify/check', 'POST', {number, code});
  console.log(check);
  if (!check.error) {
    await storeData('number', number);
    updateLogged(true);
    // Alert.alert('Success!');
  } else {
    return Alert.alert('Error', check.msg);
  }
}

async function parseLogin(number: string, updateLogged: Function) {
  console.log('/users/' + number);
  let exists = await callAPI('/users/' + number, 'GET');
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
  const [number, onChangeNumber] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, _setCountryCode] = useState('🇨🇴+57');
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    console.log('aaaaa');
    SplashScreen.hide();
  }, []);
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView className="pb-[1000px]">
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
            {/* <TextInput
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Phone Number"
              keyboardType="number-pad"
              placeholderTextColor={'#737373'}
              className="flex justify-center dark:bg-gradient-to-r dark:from-fl-y dark:via-fl-b dark:to-fl-r align-middle m-auto h-auto p-1 pl-3 text-3xl border dark:border-neutral-200 mt-5 w-72 text-center rounded-xl dark:text-neutral-50"
            /> */}
            <View className="flex flex-row justify-center m-auto align-middle mt-5">
              <TouchableOpacity
                onPress={() => setShow(!show)}
                className=" bg-neutral-900 dark:bg-neutral-200 text-center align-middle p-1 h-auto w-4/12 rounded-l-xl">
                <Text className="align-middle m-auto text-2xl text-neutral-50 dark:text-neutral-900 font-bold">
                  {countryCode}
                </Text>
              </TouchableOpacity>
              <TextInput
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                placeholderTextColor={'#737373'}
                className="flex justify-center align-middle m-auto h-auto p-1 pl-3 pb-2.5 text-2xl w-7/12 border dark:border-neutral-200 rounded-xl rounded-l-none dark:text-neutral-50"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (countryCode === '') {
                  Alert.alert('Error', 'Selecciona tu código de país.');
                } else {
                  setDisable(true);
                  parseLogin(
                    countryCode.slice(4) + number,
                    updateFunction[0],
                  ).then(() => {
                    setDisable(false);
                  });
                }
              }}
              disabled={disable}
              className="flex justify-center align-middle p-2 bg-neutral-900 dark:bg-neutral-100 w-24 rounded-xl m-auto mt-4">
              <Text className="flex align-middle font-bold m-auto text-xl text-neutral-50 dark:text-neutral-900">
                Login
              </Text>
            </TouchableOpacity>
            {/* <CountryPicker
              show={show}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={item => {
                setCountryCode(item.flag + item.dial_code);
                setShow(!show);
              }}
              onBackdropPress={() => setShow(!show)}
              lang={'es'}
              style={{modal: {height: 500}}}
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
