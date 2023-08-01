import React from 'react';
import {ScrollView, Text, View} from 'react-native';

interface RowProps {
  data: string[];
}

function Row({data}: RowProps) {
  return (
    <View className="flex flex-row min-h-max bg-neutral-800 marker:mt-5 rounded-xl p-2 border-l-2 border-r-2 divide-x-2 divide-fl-g border-fl-g">
      {data.map((v, i) => (
        <View key={i} className="p-2 w-1/3 flex flex-column">
          <Text className="flex flex-column text-neutral-300 text-center font-bold m-auto text-base">
            {v}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function Grid() {
  const times: string[][] = [
    ['9:30', 'Albert Einstein', 'Special Relativity'],
    ['10:30', 'Stephen Hawking', 'A brief history of time'],
    ['11:30', 'Marie Curie', 'Radiation and its dangerous effects'],
    ['12:30', 'Issac Newton', 'How gravity changed my life'],
    ['1:30', 'Stephen Hawking', 'A brief history of time'],
    ['2:30', 'Stephen Hawking', 'A brief history of time'],
    ['3:30', 'Stephen Hawking', 'A brief history of time'],
    ['4:30', 'Stephen Hawking', 'A brief history of time'],
  ];
  return (
    <View className="flex flex-row w-[335] m-auto h-72 rounded-xl text-neutral-50 bg-neutral-900 outline outline-8 outline-neutral-200">
      <ScrollView className=" min-h-[480]">
        {times.map((v, i) => (
          <Row key={i} data={v} />
        ))}
      </ScrollView>
    </View>
  );
}
