import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import {Appearance} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {FunctionScreenProp} from './DataTypes';

export default function Profile({
  fadeAnim,
  scale,
  isDarkMode,
  updateFunction,
}: FunctionScreenProp) {
  // const [user, set user] = useState<>([]);
  // useEffect(() => {
  //   callAPI('/salones/list', 'GET').then((salonesList: SalonAPI[]) => {
  //     for (let salon of salonesList) {
  //       callAPI('/salones', 'POST', {
  //         filter: {salon: {name: salon.name, color: salon.color}},
  //       }).then((presenters: Presenter[]) => {
  //         setSalones([...salones, {...salon, presenters}]);
  //       });
  //     }
  //   });
  // });
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-neutral-100 dark:bg-neutral-900">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View className="flex justify-center align-left mt-5">
          <TouchableOpacity
            onPress={() =>
              updateFunction[0](Appearance.getColorScheme() === 'dark')
            }
            className="w-12 absolute left-0 top-0 ml-3">
            <Feather
              name={Appearance.getColorScheme() === 'dark' ? 'sun' : 'moon'}
              size={32}
              color={
                Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#171717'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => {
              e.preventDefault();
              Alert.alert('Logout', 'Are you sure you want to logout?', [
                {text: 'No'},
                {text: 'Yes', onPress: () => updateFunction[1](false)},
              ]);
            }}
            className="w-12 absolute right-0 top-0">
            <Feather
              name={'log-out'}
              size={32}
              color={
                Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#171717'
              }
            />
          </TouchableOpacity>
          <Image
            source={
              Appearance.getColorScheme() === 'dark'
                ? require('../public/user_light.png')
                : require('../public/user_dark.png')
            }
            className="flex h-32 w-32 align-middle justify-center m-auto rounded"
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
    </Animated.View>
  );
}
