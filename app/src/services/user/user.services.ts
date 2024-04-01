// eslint-disable-next-line import/no-unresolved
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserProfileDataService = async () => {
  let token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(API_URL + '/api/v1/users/profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};
