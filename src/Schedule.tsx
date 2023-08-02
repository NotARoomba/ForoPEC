import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, View, Text, Appearance} from 'react-native';
import Grid from './Grid';

export default function Schedule() {
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
        <Text className="justify-center font-bold m-auto mt-2 text-5xl dark:text-neutral-50">
          Schedule
        </Text>
        <Grid />
      </View>
    </SafeAreaView>
  );
}
