// eslint-disable-next-line import/no-unresolved
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Form} from '../../pages/Auth/Register/Register.tsx';

export interface UserData {
  phone: string;
  password: string;
}

interface Error {
  location: string;
  msg: string;
  path: string;
  type: string;
}

interface ErrorInput {
  message: Error[] | string;
}

const createFormData = (state: Form) => {
  const data = new FormData();
  const {phone, password, name, photo} = state;

  data.append('phone', phone);
  data.append('password', password);
  data.append('name', name);
  if (photo) {
    let uriParts = photo.uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    data.append('image', {
      uri: photo.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  }

  return data;
};

const getRegisterAlertMessage = (props: ErrorInput): string => {
  const errors = Array.isArray(props.message) ? props.message : null;
  if (errors) {
    const isPhone = errors?.find(item => item.path === 'phone');
    if (isPhone) {
      return 'Такой номер телефона уже существует';
    }

    const isPassword = errors.find(item => item.path === 'password');
    if (isPassword) {
      return 'Слишком короткий пароль';
    }

    const isName = errors.find(item => item.path === 'name');
    if (isName) {
      return 'Некорректное имя';
    }

    const isPhoto = errors.find(item => item.path === 'image');
    if (isPhoto) {
      return 'Некорректное фото';
    }

    return errors.length > 0 ? errors.join(';') : 'Ошибка';
  }

  return props.message as string;
};

const getLoginAlertMessage = (props: ErrorInput): string => {
  const errors = Array.isArray(props.message) ? props.message : null;
  if (errors) {
    const isPhone = errors?.find(item => item.path === 'phone');
    if (isPhone) {
      return 'Неправильный номер телефона';
    }

    const isPassword = errors.find(item => item.path === 'password');
    if (isPassword) {
      return 'Неправильный пароль';
    }

    return errors.length > 0 ? errors.join(';') : 'Ошибка';
  }

  return props.message as string;
};

export const loginUserService = async (userData: UserData) => {
  try {
    const response = await fetch(API_URL + '/api/v1/auth/sign-in', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const responseJson = await response.json();
    console.log('response object:', responseJson);

    if (response.status !== 200) {
      return {
        status: response.status,
        message: getLoginAlertMessage(responseJson),
      };
    }

    return {status: response.status, data: responseJson};
  } catch (error) {
    return {
      status: 500,
      message: 'Request failed, Please try again!',
    };
  }
};

export const registerUserService = async (userData: Form) => {
  try {
    const body = createFormData(userData);
    const response = await fetch(API_URL + '/api/v1/auth/sign-up', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body,
    });

    const responseData = await response.json();
    if (response.status !== 200) {
      return {
        status: response.status,
        message: getRegisterAlertMessage(responseData),
      };
    }

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Request failed, Please try again!',
    };
  }
};

export const updateAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return {
        status: 401,
        message: 'Unauthorized',
      };
    }

    const response = await fetch(API_URL + '/api/v1/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    if (response.status !== 200) {
      return {
        status: response.status,
        message: responseData.message,
      };
    }

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Request failed, Please try again!',
    };
  }
};

export const logoutUserService = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return {
        status: 401,
        message: 'Unauthorized',
      };
    }

    const response = await fetch(API_URL + '/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    if (response.status !== 200) {
      return {
        status: response.status,
        message: responseData.message,
      };
    }

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Request failed, Please try again!',
    };
  }
};
