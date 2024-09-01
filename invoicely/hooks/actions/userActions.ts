import { ToastAndroid } from 'react-native';
import { postRequest } from '../ApiMethods';
import { storage } from '../localStorage';

export const handleLogin = async ({ email, password }: LoginParams) => {
  try {
    const resData = await postRequest('/auth/login', { email: email, password: password });

    await storage.storeData('token', resData.data.token);
    await storage.storeData('user', JSON.stringify(resData.data.user));

    return resData;
  } catch (error) {
    ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
  }
};

export const handleRegister = async (registerParams: RegisterParams) => {
  try {
    const resData = await postRequest('/auth/register', registerParams);

    await storage.storeData('token', resData.data.token);
    await storage.storeData('user', JSON.stringify(resData.data.user));

    return resData;
  } catch (error) {
    ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
  }
};

export const onLogout = async (router: any) => {
  await storage.removeData('user');
  await storage.removeData('token');

  ToastAndroid.show('Successfully logged out', ToastAndroid.SHORT);
  router.push('/login');
};
