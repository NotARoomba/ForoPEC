import {View, Appearance, TouchableOpacity, Linking, Text, useWindowDimensions} from 'react-native';
import {Camera, useCameraDevice, useCameraFormat} from 'react-native-vision-camera';
import QRCode from 'react-qr-code';
import PillButton from './PillButton';
import {useState} from 'react';
import {QRCameraProps} from '../utils/DataTypes';

export default function QRCamera({
  user,
  cameraPerms,
  codeScanner,
  cameraOpen,
  setCameraOpen,
}: QRCameraProps) {
  const device = useCameraDevice('back');
  const scale = useWindowDimensions().scale;
  const format = useCameraFormat(device, [
    {videoResolution: {width: 240, height: 240}},
    // {videoAspectRatio: 1}
  ]);
  return (
    <View>
      <View className="justify-center mx-auto mt-3 mb-5">
        {user.admin ? (
          <PillButton
            onPress={() => setCameraOpen(!cameraOpen)}
            color={Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#000000'}
            current={cameraOpen ? 'QR' : 'Camera'}
            text={cameraOpen ? 'QR' : 'Camera'}
          />
        ) : (
          <></>
        )}
      </View>
      {!cameraOpen ? (
        <View className="flex h-60 w-60 align-middle justify-center m-auto rounded bg-white">
          <QRCode
            size={245}
            value={user.email.toString()}
            fgColor={
              Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#171717'
            }
            bgColor={
              Appearance.getColorScheme() === 'dark' ? '#171717' : '#ffffff'
            }
            className="flex h-60 w-60 align-middle justify-center m-auto mt-10 rounded"
          />
        </View>
      ) : (
        <View className="justify-center flex mx-auto">
          {cameraPerms ? (
            device ? (
              <Camera
                className="w-60 aspect-square"
                format={format}
                style={{marginTop: scale * 20}}
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
                Necesitamos tu cámara para escanear los códigos QR. Haze clic
                para cambiarlo!
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
