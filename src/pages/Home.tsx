import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  ScrollView,
  Appearance,
  Animated,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {callAPI, getData} from '../utils/Functions';
import PillButton from '../components/PillButton';
import PresenterCard from '../components/PresenterCard';
import {ScreenProp, Salon, SalonAPI} from '../utils/Types';
import {io} from 'socket.io-client';
import Config from 'react-native-config';
import ForoPECEvents from '../../backend/models/events';
import User from '../../backend/models/user';
import {Dimensions} from 'react-native';
import ReAnimated, {FadeIn} from 'react-native-reanimated';

export default function Home({fadeAnim, scale, isDarkMode}: ScreenProp) {
  const [sals, setSalones] = useState<Salon[]>([]);
  const [cs, setCS] = useState('');
  useEffect(() => {
    let salonesList: Salon[] = [];
    async function updateSalones() {
      const {salones} = await callAPI('/salones/list', 'GET');
      for (let salon of salones) {
        const presenters = await callAPI('/salones', 'POST', {
          filter: {salon},
        });
        salonesList.push({...salon, presenters: presenters.presenters});
      }
      const {user} = await callAPI('/users/' + (await getData('email')), 'GET');
      setSalones([...salonesList]);
      setCS(
        salonesList.filter(
          s =>
            s.presenters.filter(p => p.projectName.length != 0).length > 0 &&
            s.name.toLocaleLowerCase().includes('central'),
        )[0].name,
      );
      const socket = io(Config.API_URL);
      socket.on(ForoPECEvents.UPDATE_DATA, () => {
        console.log('UPDATED HOME');
        socket.emit(
          ForoPECEvents.REQUEST_DATA,
          user.email,
          async (userData: User) => {
            const salonesAPI: SalonAPI[] = (
              await callAPI('/salones/list', 'GET')
            ).salones;
            let updSalones: Salon[] = [];
            for (let salon of salonesAPI) {
              const presenters = await callAPI('/salones', 'POST', {
                filter: {salon},
              });
              updSalones.push({...salon, presenters: presenters.presenters});
            }
            setSalones(updSalones);
          },
        );
      });
      SplashScreen.hide();
    }
    updateSalones();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    let salonesList: Salon[] = [];
    async function updateUser() {
      const {salones} = await callAPI('/salones/list', 'GET');
      for (let salon of salones) {
        const presenters = await callAPI('/salones', 'POST', {
          filter: {salon},
        });
        salonesList.push({...salon, presenters: presenters.presenters});
      }
      setSalones([...salonesList]);
      setCS(
        salonesList.filter(
          s => s.presenters.filter(p => p.projectName.length != 0).length > 0,
        )[0].name,
      );
      setRefreshing(false);
    }
    updateUser();
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
        <ScrollView
          className="pb-[1000px]"
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          <View className="flex justify-center align-middle">
            <Image
              source={
                Appearance.getColorScheme() === 'dark'
                  ? require('../../public/logo.png')
                  : require('../../public/logoDark.png')
              }
              className="flex h-36 w-11/12 align-middle justify-center m-auto bg-inherit"
              resizeMode={'contain'}
            />
          </View>
          <View>
            <Text className="justify-center font-bold m-auto mt-0 text-2xl text-neutral-900 dark:text-neutral-50">
              Salones
            </Text>
            {sals.length !== 0 ? (
              <ReAnimated.View entering={FadeIn.duration(500)}>
                <ScrollView
                  horizontal
                  contentContainerStyle={{justifyContent: 'space-between'}}
                  style={{width: (Dimensions.get('window').width / 12) * 10}}
                  className="flex flex-row m-auto mt-2 h-fit rounded-full bg-neutral-300 dark:bg-neutral-800">
                  {sals
                    .filter(
                      s =>
                        s.presenters.filter(p => p.projectName.length != 0)
                          .length > 0,
                    )
                    .map((salon, i) => (
                      <PillButton
                        key={i}
                        onPress={() => setCS(salon.name)}
                        // color={isDarkMode ? 'bg-fl-g' : 'bg-fl-dg'}
                        color={salon.color}
                        current={cs}
                        text={salon.name}
                      />
                    ))}
                </ScrollView>
                {sals
                  .filter(v => v.name === cs)
                  .map((s, i) => (
                    <View key={i}>
                      <Text className="justify-center  font-bold m-auto mt-5 text-xl text-neutral-800 dark:text-neutral-300">
                        {s.name}
                      </Text>
                      <ScrollView
                        horizontal
                        style={{
                          width: (Dimensions.get('window').width / 12) * 10,
                        }}
                        className="flex flex-row m-auto h-72 rounded-xl bg-fl-bg dark:bg-neutral-900">
                        {/* only allow ponencias that are:
                      1. Not events like lunch where the project name would be an empty string
                      2. do not allow ponencias that are in a different salon than general and are main ponencias  */}
                        {s.presenters
                          .filter(
                            p =>
                              p.projectName !== '' &&
                              (s.name == 'Ponencias Centrales' ||
                                !(
                                  p.projectName
                                    .toLocaleLowerCase()
                                    .includes('ponencia') &&
                                  p.projectName
                                    .toLocaleLowerCase()
                                    .includes('central')
                                )),
                          )
                          .map((p, i2) => (
                            <PresenterCard key={i2} {...p} {...{isDarkMode}} />
                          ))}
                      </ScrollView>
                    </View>
                  ))}
              </ReAnimated.View>
            ) : (
              <ActivityIndicator size="large" className="w-full h-full" />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
