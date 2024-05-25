import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import {AppConfig} from '../../../app.config.ts';
import {Event} from '../../types/Event.ts';
const {API_URL} = Constants.manifest?.extra as AppConfig;
interface Response {
  status: number;
  message?: string;
  events: Event[];
}

interface EventResponse {
  status: number;
  message?: string;
  event: Event | null;
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

export const getEventById = async (id: number): Promise<EventResponse> => {
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
        event: null,
      };
    }

    return {
      status: response.status,
      event: responseData.event,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Request failed, Please try again!',
      event: null,
    };
  }
};

export const createEvent = async (event: Event): Promise<EventResponse> => {
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
        event: null,
      };
    }

    return {
      status: response.status,
      event: responseData.event,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Request failed, Please try again!',
      event: null,
    };
  }
};
