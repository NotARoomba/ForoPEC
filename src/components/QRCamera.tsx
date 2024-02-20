import {
  View,
  Appearance,
  TouchableOpacity,
  Linking,
  Text,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import QRCode from 'react-qr-code';
import PillButton from './PillButton';
import {useState} from 'react';
import {QRCameraProps} from '../utils/Types';
import {Dimensions} from 'react-native';
import ReAnimated, {FadeIn} from 'react-native-reanimated';

export default function QRCamera({
  user,
  cameraPerms,
  codeScanner,
  cameraOpen,
  setCameraOpen,
}: QRCameraProps) {
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [
    {
      videoResolution: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
      },
    },
    // {videoAspectRatio: 1}
    {fps: 60},
  ]);
  return (
    <View>
      <View className="justify-center mx-auto mt-3 mb-5">
        {user.admin ? (
          <ReAnimated.View entering={FadeIn.duration(500)}>
            <PillButton
              onPress={() => setCameraOpen(!cameraOpen)}
              color={
                Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#000000'
              }
              current={cameraOpen ? 'QR' : 'Camera'}
              text={cameraOpen ? 'QR' : 'Camera'}
            />
          </ReAnimated.View>
        ) : (
          <></>
        )}
      </View>
      {!cameraOpen ? (
        <ReAnimated.View
          entering={FadeIn.duration(1000)}
          className="flex w-2/3 align-middle justify-center m-auto rounded bg-white">
          <QRCode
            size={(Dimensions.get('window').width / 3) * 2}
            value={user.email.toString()}
            fgColor={
              Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#171717'
            }
            bgColor={
              Appearance.getColorScheme() === 'dark' ? '#171717' : '#F0F3E0'
            }
            className="flex w-2/3 align-middle justify-center mx-auto  mt-10 rounded"
          />
        </ReAnimated.View>
      ) : (
        <ReAnimated.View
          entering={FadeIn.duration(1000)}
          className="justify-center flex mx-auto">
          {cameraPerms ? (
            device ? (
              <Camera
                className="w-2/3 aspect-square"
                format={format}
                isActive
                device={device}
                codeScanner={codeScanner}
              />
            ) : (
              <></>
            )
          ) : (
            <TouchableOpacity
              onPress={() => Linking.openSettings()}
              className="justify-center">
              <Text className="text-3xl text-center m-auto align-middle">
                Necesitamos tu cámara para escanear los códigos QR. Haz clic
                para cambiarlo!
              </Text>
            </TouchableOpacity>
          )}
        </ReAnimated.View>
      )}
    </View>
  );
}
