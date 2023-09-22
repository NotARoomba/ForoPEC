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
import {FunctionScreenProp} from '../utils/DataTypes';
import {CountryPicker} from 'react-native-country-codes-picker';
import {parseLogin} from '../utils/Functions';

export default function Login({
  fadeAnim,
  scale,
  isDarkMode,
  updateFunction,
}: FunctionScreenProp) {
  const [number, onChangeNumber] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('🇨🇴+57');
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 2000);
  }, []);
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
        <StatusBar
          barStyle={
            Appearance.getColorScheme() === 'dark'
              ? 'light-content'
              : 'dark-content'
          }
        />
        <ScrollView className="pb-[1000px]">
          <View className="flex justify-center align-left mt-0">
            <Image
              source={
                Appearance.getColorScheme() === 'dark'
                  ? require('../../public/logo.png')
                  : require('../../public/logoDark.png')
              }
              className="flex h-36 w-11/12 align-middle justify-center m-auto bg-inherit"
              resizeMode={'contain'}
            />
            <View className="flex flex-row justify-center m-auto align-middle mt-5">
              <TouchableOpacity
                onPress={() => setShow(!show)}
                className="bg-neutral-900 dark:bg-neutral-200 text-center align-middle p-1 h-auto min-w-[25%] max-w-[33.33333%] rounded-l-xl">
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
                  Alert.alert('Error', 'Selecciona tu código de pais.');
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
            <CountryPicker
              show={show}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={item => {
                setCountryCode(item.flag + item.dial_code);
                setShow(!show);
              }}
              onBackdropPress={() => setShow(!show)}
              lang={'es'}
              style={
                Appearance.getColorScheme() === 'dark'
                  ? {
                      modal: {height: 500, backgroundColor: '#262626'},
                      textInput: {backgroundColor: '#404040', color: '#f5f5f5'},
                      line: {backgroundColor: '#737373'},
                      countryButtonStyles: {backgroundColor: '#404040'},
                      countryName: {color: '#f5f5f5'},
                      dialCode: {color: '#f5f5f5'},
                    }
                  : {modal: {height: 500}}
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
