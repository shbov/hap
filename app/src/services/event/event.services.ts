import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Event} from '../../types/Event.ts';

interface Response {
  status: number;
  message?: string;
  events: Event[];
}

export const getEvents = async (): Promise<Response> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(API_URL + '/api/v1/event', {
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
      return {
        status: response.status,
        message: responseData.errors[0],
        events: [],
      };
    }

    return {
      status: response.status,
      events: responseData.events,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Request failed, Please try again!',
      events: [],
    };
  }
};

export const getEventById = async (id: number): Promise<Response> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(API_URL + `/api/v1/event/${id}`, {
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
      return {
        status: response.status,
        message: responseData.errors[0],
        events: [],
      };
    }

    return {
      status: response.status,
      events: responseData.events,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Request failed, Please try again!',
      events: [],
    };
  }
};

export const createEvent = async (event: Event): Promise<Response> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(API_URL + '/api/v1/event', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });

    const responseData = await response.json();
    if (response.status !== 201) {
      return {
        status: response.status,
        message: responseData.errors[0],
        events: [],
      };
    }

    return {
      status: response.status,
      events: responseData.events,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Request failed, Please try again!',
      events: [],
    };
  }
};
