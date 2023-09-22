import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface PillButtonProps {
  color: string;
  text: string;
  onPress: any;
  current: string;
}

export default function PillButton({
  color,
  text,
  onPress,
  current,
}: PillButtonProps) {
  const inactive: string = color + ' opacity-60';
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex justify-center align-middle p-2 rounded-full w-28 ${
        text === current ? color : inactive
      }`}>
      <Text
        className={`font-bold m-auto ${
          text === current ? 'text-neutral-100' : 'text-neutral-100'
        }`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
