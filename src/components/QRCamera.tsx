import {View, Appearance, TouchableOpacity, Linking, Text} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import QRCode from 'react-qr-code';
import PillButton from './PillButton';
import {useState} from 'react';
import {QRCameraProps} from '../utils/DataTypes';

export default function QRCamera({
  user,
  cameraPerms,
  codeScanner,
  cameraOpen,
  setCameraOpen
}: QRCameraProps) {

  const device = useCameraDevice('back');
  return (
    <View>
      <View className="justify-center mx-auto my-5">
        {user.admin ? (
          <PillButton
            onPress={() => setCameraOpen(!cameraOpen)}
            // color={isDarkMode ? 'bg-fl-g' : 'bg-fl-dg'}
            color={'#000000'}
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
        <View>
          {cameraPerms ? (
            device ? (
              <Camera
                className="w-60 aspect-square justify-center m-auto rounded mt-24"
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
