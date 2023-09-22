import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Animated,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Presenter, SalonAPI, ScreenProp} from '../utils/DataTypes';
import Row from '../components/Row';
import {callAPI, getData} from '../utils/Functions';

export default function Schedule({fadeAnim, scale, isDarkMode}: ScreenProp) {
  const [times, setTimes] = useState<Presenter[]>([
    {
      name: '',
      projectName: '',
      image: '',
      time: '',
      salon: {name: '', color: ''},
    },
  ]);
  useEffect(() => {
    async function updateTimes() {
      const {user} = await callAPI(
        '/users/' + (await getData('number')),
        'GET',
      );
      const salones: SalonAPI[] = (await callAPI('/salones/list', 'GET'))
        .salones;
      const {presenters} = await callAPI('/salones', 'POST', {
        filter: {salon: salones.filter(v => v.name === user.salon)[0]},
      });
      setTimes(presenters);
    }
    updateTimes();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      async function updateTimes() {
        const {user} = await callAPI(
          '/users/' + (await getData('number')),
          'GET',
        );
        const salones: SalonAPI[] = (await callAPI('/salones/list', 'GET'))
          .salones;
        const {presenters} = await callAPI('/salones', 'POST', {
          filter: {salon: salones.filter(v => v.name === user.salon)[0]},
        });
        setTimes(presenters);
        setRefreshing(false);
      }
      updateTimes();
    }, 2000);
  }, []);
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          className="pb-[1000px]"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View className="flex justify-center align-left mt-5">
            <Text className="justify-center font-bold m-auto mt-2 text-5xl dark:text-neutral-50">
              Schedule
            </Text>
            <Text className="justify-center text-neutral-500 font-bold m-auto mt-0 text-xl">
              {times[0].salon.name}
            </Text>
            <View className="flex flex-row w-[335] m-auto h-[68vh] rounded-xl bg-neutral-100 dark:bg-neutral-900 mt-0">
              <ScrollView className="min-h-[68vh] rounded-xl">
                {times.map((v, i) => (
                  <Row key={i} {...v} />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
