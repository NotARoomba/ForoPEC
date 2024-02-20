import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView,
  RefreshControl,
  Linking,
  Modal,
  TextInput,
} from 'react-native';
import {Appearance} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {FunctionScreenProp, Salon, SalonAPI} from '../utils/Types';
import SelectDropdown from 'react-native-select-dropdown';
import {callAPI, getData} from '../utils/Functions';
import User from '../../backend/models/user';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import PillButton from '../components/PillButton';
import QRCamera from '../components/QRCamera';
import ForoPECEvents from '../../backend/models/events';
import {io} from 'socket.io-client';
import Config from 'react-native-config';
import ReAnimated, { FadeIn } from 'react-native-reanimated'

export default function Profile({
  fadeAnim,
  scale,
  updateFunction,
}: FunctionScreenProp) {
  const [u, setUser] = useState<User>({
    name: '',
    salon: '',
    hasFood: false,
    admin: false,
    email: '',
  });

  const [cameraPerms, setCameraPerms] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [modalShowing, setModalShowing] = useState(false);
  const [checkingUser, setCheckingUser] = useState(false);
  const [salones, setSalones] = useState<string[]>([]);
  const [userEdit, setUserEdit] = useState<User>({
    name: '',
    salon: '',
    hasFood: false,
    admin: false,
    email: '',
  });

  useEffect(() => {
    async function updateUserPerms() {
      const {user} = await callAPI('/users/' + (await getData('email')), 'GET');
      setUser(user);
      if (user.admin) {
        if (hasPermission || (await requestPermission())) {
          setCameraPerms(true);
        } else {
          Alert.alert(
            'Activa Camera',
            'Necesitamos tu cámara para escanear los códigos QR.',
            [
              {
                text: 'Cancel',
                onPress: () => 1,
              },
              {
                text: 'Grant',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
        const salonesAPI: SalonAPI[] = (await callAPI('/salones/list', 'GET'))
          .salones;
        setSalones(salonesAPI.map(v => v.name));
      }
      const socket = io(Config.API_URL);
      socket.on(ForoPECEvents.UPDATE_DATA, () => {
        socket.emit(
          ForoPECEvents.REQUEST_DATA,
          user.email,
          async (userData: User) => {
            setUser(userData);
            const salonesAPI: SalonAPI[] = (
              await callAPI('/salones/list', 'GET')
            ).salones;
            setSalones(salonesAPI.map(v => v.name));
          },
        );
      });
    }
    updateUserPerms();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function updateUserPerms() {
      const {user} = await callAPI('/users/' + (await getData('email')), 'GET');
      setUser(user);
      setRefreshing(false);
      if (user.admin) {
        if (hasPermission || (await requestPermission())) {
          setCameraPerms(true);
        } else {
          Alert.alert(
            'Activa Camera',
            'Necesitamos tu cámara para escanear los códigos QR.',
            [
              {
                text: 'Cancel',
                onPress: () => 1,
              },
              {
                text: 'Grant',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      }
    }
    updateUserPerms();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async codes => {
      console.log(codes);
      if (!checkingUser || Date.now() % 3 === 0) {
        setCheckingUser(!checkingUser);
        const email = codes[0].value?.toLocaleLowerCase();
        const {user} = await callAPI('/users/' + email, 'GET');
        if (user) {
          setCameraOpen(!cameraOpen);
          setUserEdit((({_id, ...o}) => o)(user));
          setModalShowing(!modalShowing);
        }
        setCheckingUser(!checkingUser);
      }
    },
  });

  const updateUser = async () => {
    const status = await callAPI('/users/update', 'POST', userEdit);
    if (status.error) {
      return Alert.alert('Error', status.msg);
    } else {
      setModalShowing(!modalShowing);
    }
  };

  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-fl-bg dark:bg-neutral-900 text-black dark:text-neutral-100">
        <StatusBar
          barStyle={
            Appearance.getColorScheme() === 'dark'
              ? 'light-content'
              : 'dark-content'
          }
        />
        <ScrollView
          className="pb-[1000px]"
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
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
                  {text: 'Yes', onPress: () => updateFunction[1](false), style: 'destructive',},
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
                  ? require('../../public/user_light.png')
                  : require('../../public/user_dark.png')
              }
              className="flex h-32 w-32 align-middle justify-center m-auto rounded"
              resizeMode={'contain'}
            />
            <ReAnimated.Text entering={FadeIn.duration(500)} key={u.name} className="justify-center font-bold m-auto mt-4  text-center px-3 text-3xl text-neutral-900 dark:text-neutral-50">
              {u.name}
            </ReAnimated.Text>
            <ReAnimated.Text entering={FadeIn.duration(500)} key={u.salon + u.admin} className="justify-center text-neutral-500 font-bold m-auto mt-0 text-xl">
              {u.salon} {u.admin ? '/ Admin' : ''}
            </ReAnimated.Text>
            <QRCamera
              user={u}
              cameraPerms={cameraPerms}
              codeScanner={codeScanner}
              cameraOpen={cameraOpen}
              setCameraOpen={setCameraOpen}
            />
            <View className="flex justify-center align-middle mt-24 bg-black ">
              <Modal
                animationType="fade"
                visible={modalShowing}
                style={{backgroundColor: '#000000'}}
                transparent
                onRequestClose={() => {
                  setModalShowing(!modalShowing);
                  setCameraOpen(!cameraOpen);
                }}>
                <View className="flex justify-center bg-neutral-50/70 dark:bg-neutral-900/70 h-screen">
                  <View className="flex jutify-center align-middle m-auto bg-neutral-50 dark:bg-neutral-900 w-9/12 h-3/5 rounded-xl shadow-xl">
                    <View className="flex flex-row">
                      <Text className="m-auto mt-2 text-2xl font-bold text-black dark:text-white  ">
                        Actualizar Usuario
                      </Text>
                    </View>
                    <View className="h-0.5 w-10/12 bg-black dark:bg-neutral-200 mx-auto rounded-full" />
                    <View className="mt-2">
                      <View className="justify-center mx-auto my-2 w-full">
                        <Text className="text-lg mx-auto text-black dark:text-white">
                          Nombre
                        </Text>
                        <TextInput
                          onChange={str =>
                            setUserEdit({
                              ...userEdit,
                              name: str.nativeEvent.text,
                            })
                          }
                          value={userEdit.name}
                          placeholder="Nombre"
                          className="w-11/12 pl-1 pt-0 pb-0 text-center mx-auto h-8 rounded-xl outline border dark:border-neutral-200"
                        />
                      </View>
                      <View className="justify-center mx-auto my-2 w-full">
                        <Text className="text-lg mx-auto text-black dark:text-white">
                          Ha Comido?
                        </Text>
                        <SelectDropdown
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.label;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.label;
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
                          defaultValue={{
                            label: userEdit.hasFood ? 'Si' : 'No',
                            value: userEdit.hasFood,
                          }}
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
                            backgroundColor:
                              Appearance.getColorScheme() === 'dark'
                                ? '#262626'
                                : '#e5e5e5',
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
                          onSelect={choice =>
                            setUserEdit({...userEdit, hasFood: choice.value})
                          }
                          data={[
                            {label: 'Si', value: true},
                            {label: 'No', value: false},
                          ]}
                        />
                      </View>
                      <View className="justify-center mx-auto mt-0 mb-5 w-full">
                        <Text className="text-lg mx-auto text-black dark:text-white">
                          Salon
                        </Text>
                        <SelectDropdown
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
                          defaultValue={userEdit.salon}
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
                            backgroundColor:
                              Appearance.getColorScheme() === 'dark'
                                ? '#262626'
                                : '#e5e5e5',
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
                          onSelect={choice =>
                            setUserEdit({...userEdit, salon: choice})
                          }
                          data={salones}
                        />
                      </View>
                    </View>
                    <View className="flex flex-row justify-center gap-2">
                      <TouchableOpacity
                        onPress={() => setModalShowing(!modalShowing)}
                        className="bg-black dark:bg-neutral-200 flex justify-center align-middle p-2 rounded-full w-28">
                        <Text className="text-xl text-neutral-50 dark:text-black m-auto font-bold">
                          Close
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={updateUser}
                        className="flex bg-black dark:bg-neutral-200 justify-center align-middle p-2 rounded-full w-28">
                        <Text className="text-lg text-neutral-50 dark:text-black m-auto font-bold">
                          Save
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
