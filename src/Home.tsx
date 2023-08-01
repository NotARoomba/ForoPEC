import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  useColorScheme,
  Text,
  ScrollView,
} from 'react-native';
import {Presenter, Salon} from './DataTypes';
import PillButton from './PillButton';
import PresenterCard from './PresenterCard';
import SplashScreen from 'react-native-splash-screen';

export default function Home() {
  const [cs, setCS] = useState('Salon 1A');
  const isDarkMode = useColorScheme() === 'dark';
  const presenters: Presenter[] = [
    {
      name: 'Stephen',
      projectName: 'A Brief History of Time',
      image: require('../public/person1.jpg'),
    },
    {
      name: 'Albert Einstein',
      projectName: 'Special Relativity',
      image: require('../public/person2.jpg'),
    },
    {
      name: 'Albert Einstein',
      projectName: 'Special Relativity',
      image: require('../public/person2.jpg'),
    },
  ];
  const presenters2: Presenter[] = [
    {
      name: 'Stephen',
      projectName: 'A Brief History of Time',
      image: require('../public/person1.jpg'),
    },
    {
      name: 'Stephen',
      projectName: 'A Brief History of Time',
      image: require('../public/person1.jpg'),
    },
  ];
  const salones: Salon[] = [
    {name: 'Salon 1A', color: 'bg-red', presenters},
    {name: 'Salon 2A', color: 'bg-red', presenters: presenters2},
    {name: 'Salon 3A', color: 'bg-red', presenters},
  ];
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView className="bg-neutral-900">
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <View className="flex justify-center align-middle">
        <Image
          source={require('../public/logo.png')}
          className="flex h-36 w-11/12 align-middle justify-center m-auto bg-neutral-900"
          resizeMode={'contain'}
        />
      </View>
      <View>
        <Text className="justify-center text-neutral-50 font-bold m-auto mt-0 text-2xl">
          Salones
        </Text>
        <ScrollView
          horizontal
          className="flex flex-row w-[335] m-auto mt-2 h-8 rounded-xl text-neutral-50 bg-neutral-800 outline outline-8 outline-neutral-200">
          {salones.map((salon, i) => (
            <PillButton
              key={i}
              onPress={() => setCS(salon.name)}
              color="bg-fl-g"
              text={salon.name}
            />
          ))}
        </ScrollView>
        {salones
          .filter(v => v.name === cs)
          .map((s, i) => (
            <View key={i}>
              <Text className="justify-center text-neutral-300 font-bold m-auto mt-5 text-xl">
                {s.name}
              </Text>
              <ScrollView
                horizontal
                className="flex flex-row w-[335] m-auto h-72 rounded-xl text-neutral-50 bg-neutral-900 outline outline-8 outline-neutral-200">
                {s.presenters.map((p, i2) => (
                  <PresenterCard key={i2} {...p} />
                ))}
              </ScrollView>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
}
