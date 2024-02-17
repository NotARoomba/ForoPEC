import prompt from '@powerdesigninc/react-native-prompt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-es';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import STATUS_CODES from '../../backend/models/status';
import { Localizations } from './Localizations';

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
          await fetch(Config.API_URL + endpoint, {
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
          await fetch(Config.API_URL + endpoint, {
            method: method,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: hmac,
            },
          })
        ).json();
  } catch (error: any) {
    if (!error.response) return {status: STATUS_CODES.NO_CONNECTION};
    // Alert.alert('Error!', 'No podemos conectar a nuestro servidor! Revisa tu conexion al internet.')
    return {
      status: STATUS_CODES.GENERIC_ERROR,
    };
  }
}

async function checkLogin(email: string, code: string, updateLogged: Function) {
  const check = await callAPI('/verify/check', 'POST', {email, code});
  if (check.status == STATUS_CODES.SUCCESS) {
    await storeData('email', email);
    updateLogged(true);
  } else {
    return Alert.alert(
      Localizations.error,
      Localizations.getString(STATUS_CODES[check.status]),
    );
  }
}

export async function parseLogin(email: string, updateLogged: Function, setLoading: Function) {
  console.log('/users/' + email);
  const res = await callAPI('/verify/send', 'POST', {email});
  if (res.status == STATUS_CODES.SUCCESS) {
    setLoading(false);
    setTimeout(() => {
      return prompt(
        Localizations.enterCodeTitle,
        Localizations.enterCodeDesc + email,
        async input => await checkLogin(email, input, updateLogged),
        'plain-text',
        '',
        'number-pad',
      );
    }, 250);
  } else {
    setLoading(false);
    setTimeout(() => {
      return Alert.alert(
        Localizations.error,
        Localizations.getString(STATUS_CODES[res.status]),
      );
    }, 250);
  }
}
