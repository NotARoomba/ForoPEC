import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  ScrollView,
  Appearance,
} from 'react-native';
import {Presenter, Salon} from './DataTypes';
import PillButton from './PillButton';
import PresenterCard from './PresenterCard';
import SplashScreen from 'react-native-splash-screen';

export default function Home() {
  const [cs, setCS] = useState('Salon 1A');
  const presenters: Presenter[] = [
    {
      name: 'Stephen Hawking',
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
      projectName: 'Como los humanos nessecitan ayuda',
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
  const [colorScheme, setColorScheme] = React.useState(
    Appearance.getColorScheme(),
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Appearance.addChangeListener(({colorScheme}) =>
      setColorScheme(colorScheme),
    );
  }, []);

  const isDarkMode = colorScheme === 'dark';
  return (
    <SafeAreaView className="bg-fl-yy dark:bg-neutral-900">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View className="flex justify-center align-middle">
        <Image
          source={
            isDarkMode
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
          className="flex flex-row w-[335] m-auto mt-2 h-8 rounded-xl  dark:bg-neutral-800">
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
                className="flex flex-row w-[335] m-auto h-72 rounded-xl bg-fl-ys dark:bg-neutral-900">
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
