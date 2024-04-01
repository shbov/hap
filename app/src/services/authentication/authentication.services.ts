import {API_URL} from '@env';

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
  errors: Error[];
}

const getAlertMessage = ({errors}: ErrorInput) => {
  const isPhone = errors?.find(item => item.path === 'phone');
  if (isPhone) {
    return 'Неправильный номер телефона';
  }

  const isPassword = errors.find(item => item.path === 'password');
  if (isPassword) {
    return 'Неправильный пароль';
  }

  return errors.length > 0 ? errors.join(';') : 'Ошибка';
};

export const loginUserService = async (userData: UserData) => {
  try {
    const response = await fetch(API_URL + '/api/v1/auth/sign-in', {
      method: 'POST',
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
        message: getAlertMessage(responseJson),
      };
    }

    return {status: 200, data: responseJson};
  } catch (error) {
    console.log('Request failed, Please try again!');
    return {
      status: 500,
      message: 'Request failed, Please try again!',
    };
  }
};

export const registerUserService = async (userData: UserData) => {
  try {
    const response = await fetch(API_URL + '/api/v1/auth/sign-up', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};
