import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Appearance} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function Profile() {
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
    <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View className="flex justify-center align-left mt-5">
        <TouchableOpacity
          onPress={() => {
            Appearance.setColorScheme(
              Appearance.getColorScheme() === 'dark' ? 'light' : 'dark',
            );
          }}
          className="w-12 absolute right-0 top-0">
          <Feather
            name={isDarkMode ? 'sun' : 'moon'}
            size={32}
            color={isDarkMode ? '#ffffff' : '#171717'}
          />
        </TouchableOpacity>
        <Image
          source={require('../public/person1.jpg')}
          className="flex h-32 w-32 align-middle justify-center m-auto bg-neutral-600 rounded-full"
          resizeMode={'contain'}
        />
        <Text className="justify-center font-bold m-auto mt-4 text-3xl dark:text-neutral-50">
          Mr Potato
        </Text>
        <Text className="justify-center text-neutral-500 font-bold m-auto mt-0 text-xl">
          Salon 2B
        </Text>
        <Image
          source={require('../public/qrcode.png')}
          className="flex h-60 w-60 align-middle justify-center m-auto mt-10 bg-neutral-600 rounded"
          resizeMode={'contain'}
        />
      </View>
    </SafeAreaView>
  );
}
