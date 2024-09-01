import { ToastAndroid } from 'react-native';
import { postRequest } from '../ApiMethods';

export const createInvoice = async (invoice: object) => {
  try {
    console.log(invoice);
    const resData = await postRequest('/invoice/add', invoice);

    console.log(resData);
    return resData;
  } catch (error) {
    ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
  }
};

export const fetchInvoicesFromApi = async () => {
  try {
    const resData = await postRequest('/invoice/fetch-all', {});

    return resData;
  } catch (error) {
    ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
  }
};

export const fetchMyInvoicesFromApi = async () => {
  try {
    const resData = await postRequest('/invoice/fetch-my', {});

    return resData;
  } catch (error) {
    ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
  }
};
