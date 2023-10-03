import prompt from '@powerdesigninc/react-native-prompt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-es';
import {Alert} from 'react-native';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const API = 'https://foropec2023-api.notaroomba.xyz';

export async function callAPI(
  endpoint: string,
  method: string,
  body: object = {},
) {
  const time = Date.now().toString();
  const data = JSON.stringify(body);
  const digest = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(
      time + method + endpoint + CryptoJS.MD5(data).toString(),
      Math.floor(Date.now() / (30 * 1000)).toString(),
    ),
  );
  const hmac = `HMAC ${time}:${digest}`;
  try {
  return method === 'POST'
    ? await (
        await fetch(API + endpoint, {
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: hmac,
          },
          body: JSON.stringify(body),
        })
      ).json()
    : await (
        await fetch(API + endpoint, {
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: hmac,
          },
        })
      ).json();
  } catch {
    return {error: true, msg: 'Could not connect to the server!'};
  }
}

async function checkLogin(email: string, code: string, updateLogged: Function) {
  const check = await callAPI('/verify/check', 'POST', {email, code});
  if (!check.error) {
    await storeData('email', email);
    updateLogged(true);
    // Alert.alert('Success!');
  } else {
    return Alert.alert('Error', check.msg);
  }
}

export async function parseLogin(email: string, updateLogged: Function) {
  console.log('/users/' + email);
  let exists = await callAPI('/users/' + email, 'GET');
  if (!exists.user && exists.error) {
    return Alert.alert('Error', exists.msg);
  }
  const res = await callAPI('/verify/send', 'POST', {email});
  if (!res.error) {
    return prompt(
      'Enter Code',
      'Enter the verification code that was sent to ' + email,
      async input => await checkLogin(email, input, updateLogged),
      'plain-text',
      '',
      'number-pad',
    );
  } else {
    return Alert.alert('Error', res.msg);
  }
}
