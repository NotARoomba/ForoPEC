import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  ScrollView,
  Animated,
  Appearance,
} from 'react-native';
import {ScreenProp, Presenter, Salon} from './DataTypes';
import PillButton from './PillButton';
import PresenterCard from './PresenterCard';

export default function Home({fadeAnim, scale, isDarkMode}: ScreenProp) {
  const [cs, setCS] = useState('Salon 1A');
  const presenters: Presenter[] = [
    {
      name: 'Stephen Hawking',
      projectName: 'A Brief History of Time',
      image: '../public/person1.jpg',
    },
    {
      name: 'Albert Einstein',
      projectName: 'Special Relativity',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg',
    },
    {
      name: 'Albert Einstein',
      projectName: 'Como los humanos nessecitan ayuda',
      image: '../public/person2.jpg',
    },
  ];
  const presenters2: Presenter[] = [
    {
      name: 'Stephen',
      projectName: 'A Brief History of Time',
      image: '../public/person1.jpg',
    },
    {
      name: 'Stephen',
      projectName: 'A Brief History of Time',
      image: '../public/person1.jpg',
    },
  ];
  const salones: Salon[] = [
    {name: 'Salon 1A', color: 'bg-red', presenters},
    {name: 'Salon 2A', color: 'bg-red', presenters: presenters2},
    {name: 'Salon 3A', color: 'bg-red', presenters},
  ];
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View className="flex justify-center align-middle">
          <Image
            source={
              Appearance.getColorScheme() === 'dark'
                ? require('../public/logo.png')
                : require('../public/logoDark.png')
            }
            className="flex h-36 w-11/12 align-middle justify-center m-auto bg-inherit"
            resizeMode={'contain'}
          />
        </View>
        <View>
          <Text className="justify-center font-bold m-auto mt-0 text-2xl text-neutral-900 dark:text-neutral-50">
            Salones
          </Text>
          <ScrollView
            horizontal
            className="flex flex-row w-[335] m-auto mt-2 h-8 rounded-xl bg-neutral-300 dark:bg-neutral-800">
            {salones.map((salon, i) => (
              <PillButton
                key={i}
                onPress={() => setCS(salon.name)}
                color={isDarkMode ? 'bg-fl-g' : 'bg-fl-dg'}
                current={cs}
                text={salon.name}
              />
            ))}
          </ScrollView>
          {salones
            .filter(v => v.name === cs)
            .map((s, i) => (
              <View key={i}>
                <Text className="justify-center  font-bold m-auto mt-5 text-xl text-neutral-800 dark:text-neutral-300">
                  {s.name}
                </Text>
                <ScrollView
                  horizontal
                  className="flex flex-row w-[335] m-auto h-72 rounded-xl bg-neutral-100 dark:bg-neutral-900">
                  {s.presenters.map((p, i2) => (
                    <PresenterCard key={i2} {...p} {...{isDarkMode}} />
                  ))}
                </ScrollView>
              </View>
            ))}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
