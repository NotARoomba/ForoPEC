import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Animated,
  ScrollView,
  RefreshControl,
  Appearance,
  ActivityIndicator,
} from 'react-native';
import {Presenter, Salon, SalonAPI, ScreenProp} from '../utils/Types';
import Row from '../components/Row';
import {callAPI, getData} from '../utils/Functions';
import Config from 'react-native-config';
import {io} from 'socket.io-client';
import ForoPECEvents from '../../backend/models/events';
import User from '../../backend/models/user';
import SelectDropdown from 'react-native-select-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import ReAnimated, { FadeIn } from 'react-native-reanimated';
import {Dimensions} from 'react-native';

export default function Schedule({fadeAnim, scale, isDarkMode}: ScreenProp) {
  const [times, setTimes] = useState<Presenter[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [salonesList, setSalonesList] = useState<SalonAPI[]>([]);
  const [currentSalon, setCurrentSalon] = useState('');
  useEffect(() => {
    async function updateTimes() {
      const {user} = await callAPI('/users/' + (await getData('email')), 'GET');
      const salones: SalonAPI[] = (await callAPI('/salones/list', 'GET'))
        .salones;
      setIsAdmin(user.admin);
      setSalonesList(salones);
      setCurrentSalon(user.salon);
      const {presenters} = await callAPI('/salones', 'POST', {
        filter: {salon: salones.filter(v => v.name === user.salon)[0]},
      });
      setTimes(presenters);
      const socket = io(Config.API_URL);
      socket.on(ForoPECEvents.UPDATE_DATA, () => {
        socket.emit(
          ForoPECEvents.REQUEST_DATA,
          user.email,
          async (userData: User) => {
            const salones: SalonAPI[] = (await callAPI('/salones/list', 'GET'))
              .salones;
            setIsAdmin(userData.admin);
            setSalonesList(salones);
            setCurrentSalon(userData.salon);
            const {presenters} = await callAPI('/salones', 'POST', {
              filter: {
                salon: salones.filter(v => v.name === userData.salon)[0],
              },
            });
            setTimes(presenters);
          },
        );
      });
    }
    updateTimes();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      async function updateTimes() {
        const user: User = (
          await callAPI('/users/' + (await getData('email')), 'GET')
        ).user;
        const salones: SalonAPI[] = (await callAPI('/salones/list', 'GET'))
          .salones;
        setIsAdmin(user.admin);
        setSalonesList(salones);
        setCurrentSalon(user.salon);
        const {presenters} = await callAPI('/salones', 'POST', {
          filter: {salon: salones.filter(v => v.name === user.salon)[0]},
        });
        setTimes(presenters);
        setRefreshing(false);
      }
      updateTimes();
    }, 2000);
  }, []);

  const changeSalon = async (salon: SalonAPI) => {
    setCurrentSalon(salon.name);
    const {presenters} = await callAPI('/salones', 'POST', {
      filter: {salon},
    });
    setTimes(presenters);
  };

  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-fl-bg dark:bg-neutral-900">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          className="h-[100vh]"
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          <View className="flex justify-center align-left mt-5">
            <Text className="justify-center font-bold m-auto mt-2 text-5xl text-neutral-900 dark:text-neutral-50">
              Schedule
            </Text>
            {/* button to change salon only for admin */}
            
            {isAdmin && salonesList.length !== 0 ? (
              <ReAnimated.View entering={FadeIn.duration(500)}><SelectDropdown
                data={salonesList}
                key={currentSalon}
                buttonTextStyle={{
                  marginRight: -14,
                  fontWeight: 'bold',
                  color:
                    Appearance.getColorScheme() === 'dark'
                      ? '#fafafa'
                      : '#171717',
                }}
                buttonStyle={{
                  justifyContent: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: 25,
                  width: (Dimensions.get('window').width / 3) * 2,
                  backgroundColor:
                    Appearance.getColorScheme() === 'dark'
                      ? '#262626'
                      : '#F8F9F0',
                }}
                dropdownStyle={{
                  display: 'flex',
                  borderRadius: 25,
                  backgroundColor:
                    Appearance.getColorScheme() === 'dark'
                      ? '#262626'
                      : '#e5e5e5',
                }}
                rowTextStyle={{
                  color:
                    Appearance.getColorScheme() === 'dark'
                      ? '#fafafa'
                      : '#171717',
                }}
                rowStyle={{
                  borderBottomColor:
                    Appearance.getColorScheme() === 'dark'
                      ? '#525252'
                      : '#a3a3a3',
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
                renderDropdownIcon={isOpened => {
                  return (
                    <Feather
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={
                        Appearance.getColorScheme() === 'dark'
                          ? '#16BA65'
                          : '#026D36'
                      }
                      size={28}
                    />
                  );
                }}
                onSelect={(salon: SalonAPI) => changeSalon(salon)}
                defaultButtonText={currentSalon}
              /></ReAnimated.View>
            ) : currentSalon !== "" ? (
              <ReAnimated.View entering={FadeIn.duration(500)}><Text className="justify-center text-neutral-500 font-bold m-auto mt-0 text-xl">
                {currentSalon}
              </Text></ReAnimated.View>
            ) : <></>}

            <View
              style={{width: (Dimensions.get('window').width / 12) * 10}}
              className="flex flex-row m-auto h-[68vh] mt-3 align-middle rounded-xl bg-fl-bg  dark:bg-neutral-900">
              {times.length != 0 ? <ReAnimated.ScrollView entering={FadeIn.duration(500)} className="min-h-[68vh]  rounded-xl">
                {times.map((v, i) => (
                  <Row key={i} {...v} />
                ))}
              </ReAnimated.ScrollView> : <ActivityIndicator size='large' className='w-full h-full' />}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
