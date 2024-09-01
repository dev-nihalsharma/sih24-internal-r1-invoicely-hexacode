import { ToastAndroid } from 'react-native';
import { postRequest } from '../ApiMethods';

export const fetchStatsFromApi = async () => {
  try {
    const resData = await postRequest('/stats/all', {});

    return resData;
  } catch (error) {
    ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
  }
};
