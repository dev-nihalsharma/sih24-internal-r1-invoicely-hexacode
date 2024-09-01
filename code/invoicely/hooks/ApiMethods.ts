import Toast from 'react-native-toast-message';
import { storage } from './localStorage';
import axios from 'axios';
import { ToastAndroid } from 'react-native';

const api_endpoint = 'http://206.189.143.108:3000';

export const getRequest = async (url: string) => {
  const token = await storage.retrieveData('token');
  const response = await axios(`${api_endpoint}${url}`);

  if (response.data.error) {
    Toast.show({
      type: 'failure',
      text1: 'Something went wrong',
      text2: response.data.error,
    });
  }

  return response.data;
};

export const postRequest = async (url: string, body: object) => {
  const token = await storage.retrieveData('token');

  const response = await axios.post(`${api_endpoint}${url}`, body, {
    headers: {
      token: token,
    },
  });

  if (response.data.error) {
    ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
  }

  return response.data;
};
