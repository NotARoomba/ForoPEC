import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import ColorContrastChecker from 'color-contrast-checker'

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
  const ccc = new ColorContrastChecker();
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex justify-center align-middle p-2 rounded-full w-28 ${
        text === current ? '' : ' opacity-60'
      }`} style={{backgroundColor: color}}>
      <Text
        className={`font-bold m-auto ${
          ccc.isLevelAA(color, '#f5f5f5', 14) ? 'text-neutral-100' : 'text-neutral-900'
        }`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
