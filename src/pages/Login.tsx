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
  ScrollView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {FunctionScreenProp} from '../utils/DataTypes';
import {parseLogin} from '../utils/Functions';

export default function Login({
  fadeAnim,
  scale,
  updateFunction,
}: FunctionScreenProp) {
  const [email, onChangeEmail] = useState('');
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
              <TextInput
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
                placeholderTextColor={'#737373'}
                className="flex justify-center align-middle m-auto h-auto p-1 pl-3 pb-2.5 text-2xl w-11/12 border dark:border-neutral-200 rounded-xl  dark:text-neutral-50"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setDisable(true);
                parseLogin(email, updateFunction[0]).then(() => {
                  setDisable(false);
                });
              }}
              disabled={disable}
              className="flex justify-center align-middle p-2 bg-neutral-900 dark:bg-neutral-100 w-24 rounded-xl m-auto mt-4">
              <Text className="flex align-middle font-bold m-auto text-xl text-neutral-50 dark:text-neutral-900">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
