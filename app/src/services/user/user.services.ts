// eslint-disable-next-line import/no-unresolved
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserProfileDataService = async () => {
  let token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(API_URL + '/api/v1/users/profile', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};

export const updateProfileDataService = async (data: any) => {
  let token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(API_URL + '/api/v1/users/profile', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};

export const updatePasswordDataService = async (data: any) => {
  let token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(API_URL + '/api/v1/users/password', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};

export const updateAvatarDataService = async (data: any) => {
  let token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(API_URL + '/api/v1/users/avatar', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};

export const deleteAvatarDataService = async () => {
  let token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(API_URL + '/api/v1/users/avatar', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};
