import { Alert, ToastAndroid } from 'react-native';
import { postRequest } from '../ApiMethods';
import { PdfCode } from '@/components/PdfTemplate';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

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
export const deleteInvoice = async (id: string) => {
  try {
    const resData = await postRequest('/invoice/delete', { id });

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

export const printToFile = async (invoice: Invoice) => {
  let html = PdfCode(invoice);

  try {
    const { uri } = await Print.printToFileAsync({
      html,
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  } catch (err) {
    ToastAndroid.show('No internet connection', ToastAndroid.LONG);
  }
};
