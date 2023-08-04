import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Presenter, SalonAPI, callAPI, getData} from './DataTypes';

function Row(presenter: Presenter) {
  return (
    <View className="flex flex-row min-h-max marker:mt-5 rounded-xl p-2 border-l-2 border-r-2 divide-x-2 divide-fl-dg border-fl-dg bg-neutral-200 shadow dark:shadow-none shadow-neutral-500 dark:divide-fl-dg dark:border-fl-g  dark:bg-neutral-800 ">
      <View className="p-2 w-1/3 flex flex-column">
        <Text className="flex flex-column text-center font-bold m-auto text-sm dark:text-neutral-300">
          {presenter.time}
        </Text>
      </View>
      <View className="p-2 w-1/3 flex flex-column">
        <Text className="flex flex-column text-center font-bold m-auto text-sm dark:text-neutral-300">
          {presenter.name}
        </Text>
      </View>
      <View className="p-2 w-1/3 flex flex-column">
        <Text className="flex flex-column text-center font-bold m-auto text-sm dark:text-neutral-300">
          {presenter.projectName}
        </Text>
      </View>
    </View>
  );
}

export default function Grid() {
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
  return (
    <>
      <Text className="justify-center text-neutral-500 font-bold m-auto mt-0 text-xl">
        {times[0].salon.name}
      </Text>
      <View className="flex flex-row w-[335] m-auto h-64 rounded-xl bg-neutral-100 dark:bg-neutral-900 mt-0">
        <ScrollView className="min-h-[68vh] rounded-xl">
          {times.map((v, i) => (
            <Row key={i} {...v} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}
