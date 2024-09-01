import CustomButton from '@/components/CustomButton';
import CustomTextInput from '@/components/CustomTextInput';
import { GlobalColors } from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyles';
import { handleLogin } from '@/hooks/actions/userActions';
import { Link } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { ToastAndroid } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onLogin = async () => {
    const res = await handleLogin({ email, password });

    if (res.data.user) {
      setPassword('');
      setEmail('');
      ToastAndroid.show('LoggedIn Successfully!', ToastAndroid.SHORT);
      router.push('/');
    }
  };

  return (
    <SafeAreaView style={globalStyles.AndroidSafeArea}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={require('@/assets/images/logo-transparent.png')} style={styles.image} />
        <Text style={styles.title}>Welcome Back!</Text>
        <View style={styles.inputView}>
          <CustomTextInput placeholder={'Enter your email'} value={email} onChangeText={setEmail} />
          <CustomTextInput placeholder='password' value={password} onChangeText={setPassword} hidden={true} />
        </View>
        <CustomButton onPress={() => onLogin()} buttonText={'Login'} />

        <Text style={styles.footerText}>
          Don't Have Account?
          <Link to={'/register'}>
            <Text style={styles.signup}> Sign Up</Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'condensedBold',
    textAlign: 'center',
    paddingVertical: 30,
    color: GlobalColors.primary,
  },
  image: {
    width: 300,
    height: 50,
    alignSelf: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',
  },
  signup: {
    color: GlobalColors.primary,
    fontSize: 14,
  },
});
