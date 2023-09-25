import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Appearance} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {FunctionScreenProp, User} from '../utils/DataTypes';
import QRCode from 'react-qr-code';
import {callAPI, getData} from '../utils/Functions';

export default function Profile({
  fadeAnim,
  scale,
  isDarkMode,
  updateFunction,
}: FunctionScreenProp) {
  const [u, setUser] = useState<User>({
    name: '',
    salon: '',
    admin: false,
    number: '',
  });
  useEffect(() => {
    async function updateUser() {
      console.log((await getData('number')));
      const {user} = await callAPI(
        '/users/' + (await getData('number')),
        'GET',
      );
      setUser(user);
    }
    updateUser();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function updateUser() {
      const {user} = await callAPI(
        '/users/' + (await getData('number')),
        'GET',
      );
      setUser(user);
      setRefreshing(false);
    }
    updateUser();
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
        <ScrollView
          className="pb-[1000px]"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View className="flex justify-center align-left mt-5">
            <TouchableOpacity
              onPress={() =>
                updateFunction[0](Appearance.getColorScheme() === 'dark')
              }
              className="w-12 absolute left-0 top-0 ml-3">
              <Feather
                name={Appearance.getColorScheme() === 'dark' ? 'sun' : 'moon'}
                size={32}
                color={
                  Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#171717'
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={e => {
                e.preventDefault();
                Alert.alert('Logout', 'Are you sure you want to logout?', [
                  {text: 'No'},
                  {text: 'Yes', onPress: () => updateFunction[1](false)},
                ]);
              }}
              className="w-12 absolute right-0 top-0">
              <Feather
                name={'log-out'}
                size={32}
                color={
                  Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#171717'
                }
              />
            </TouchableOpacity>
            <Image
              source={
                Appearance.getColorScheme() === 'dark'
                  ? require('../../public/user_light.png')
                  : require('../../public/user_dark.png')
              }
              className="flex h-32 w-32 align-middle justify-center m-auto rounded"
              resizeMode={'contain'}
            />
            <Text className="justify-center font-bold m-auto mt-4 text-3xl dark:text-neutral-50">
              {u.name}
            </Text>
            <Text className="justify-center text-neutral-500 font-bold m-auto mt-0 text-xl">
              {u.salon}
            </Text>
            <View className="flex h-60 w-60 align-middle justify-center m-auto mt-10 rounded">
              <QRCode
                size={245}
                value={u.number.toString()}
                fgColor={
                  Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#171717'
                }
                bgColor={
                  Appearance.getColorScheme() === 'dark' ? '#171717' : '#ffffff'
                }
                className="flex h-60 w-60 align-middle justify-center m-auto mt-10 rounded"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
