import React, {useEffect, useState} from 'react';
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
import {ScreenProp, Salon, callAPI} from './DataTypes';
import PillButton from './PillButton';
import PresenterCard from './PresenterCard';

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
      setSalones([...salonesList]);
      setCS(salonesList[0].name);
    }
    updateSalones();
  }, []);
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
            {sals.map((salon, i) => (
              <PillButton
                key={i}
                onPress={() => setCS(salon.name)}
                color={isDarkMode ? 'bg-fl-g' : 'bg-fl-dg'}
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
