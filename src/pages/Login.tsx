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
import {FunctionScreenProp} from '../utils/Types';
import {parseLogin} from '../utils/Functions';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login({
  fadeAnim,
  scale,
  updateFunction,
}: FunctionScreenProp) {
  const [email, onChangeEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 2000);
  }, []);
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-fl-bg dark:bg-neutral-900">
        <StatusBar
          barStyle={
            Appearance.getColorScheme() === 'dark'
              ? 'light-content'
              : 'dark-content'
          }
        />
        
        <Spinner
          visible={loading}
          overlayColor="#00000099"
          textContent={"Loading"}
          textStyle={{color: '#fff', marginTop: -50}}
          animation="fade"
        />
        <KeyboardAwareScrollView className="h-[100vh]">
          <View className="flex justify-around align-left mt-0">
            <Image
              source={
                Appearance.getColorScheme() === 'dark'
                  ? require('../../public/logo.png')
                  : require('../../public/logoDark.png')
              }
              className="flex h-36 w-11/12 align-middle justify-center m-auto bg-inherit mt-[5vh]"
              resizeMode={'contain'}
            />
            <View className=' bg-fl-y w-5/6 mx-auto rounded-xl py-8 mt-[10vh]'>
              <View className='gap-0 mx-auto'>
            <Text className='text-xl font-semibold pl-1 text-fl-text'>Email</Text>
            <View className="flex flex-row justify-center m-auto align-middle mt-5">
              <TextInput
                onChangeText={onChangeEmail}
                value={email}
                keyboardType='email-address'
                className="flex justify-center align-middle m-auto h-auto p-1 pl-3 pb-2.5 text-2xl w-11/12 text-neutral-800/75 rounded-xl bg-fl-ly "
              />
            </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                parseLogin(email.toLocaleLowerCase(), updateFunction[0], setLoading);
              }}
              disabled={loading}
              className="flex justify-center align-middle p-2 py-3 bg-fl-b dark:bg-neutral-100 w-2/3 rounded-full m-auto mt-4">
              <Text className="flex align-middle font-bold m-auto text-xl text-neutral-50 dark:text-neutral-900">
                Login
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View className='bottom-20 text-center mx-auto'>
          <Text className='text-base dark:text-fl-text'>Made with love</Text>
          <Text className='font-bold text-center text-base dark:text-fl-text'>@notaroomba</Text>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
