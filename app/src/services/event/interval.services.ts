import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import {AppConfig} from '../../../app.config.ts';

const {API_URL} = Constants.manifest?.extra as AppConfig;

interface Interval {
  id: number;
  name: string;
  days: string[];
}

export const getIntervals = async (): Promise<Interval[]> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(API_URL + '/api/v1/interval', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    if (response.status !== 200) {
      return [];
    }

    return responseData.intervals;
  } catch (error) {
    console.log(error);
    return [];
  }
};
