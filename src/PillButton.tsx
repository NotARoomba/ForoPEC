import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface PillButtonProps {
  color: string;
  text: string;
  onPress: any;
}

export default function PillButton({color, text, onPress}: PillButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        'flex justify-center align-middle p-2 rounded-full w-28 ' + color
      }>
      <Text className="text-neutral-100 font-bold m-auto">{text}</Text>
    </TouchableOpacity>
  );
}
