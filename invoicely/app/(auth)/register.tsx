import CustomButton from '@/components/CustomButton';
import CustomTextInput from '@/components/CustomTextInput';
import { GlobalColors } from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyles';
import { handleRegister } from '@/hooks/actions/userActions';
import { Link } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [address, setAddress] = useState('');
  const [roles, setRoles] = useState([
    { label: 'ADMIN', value: 'admin' },
    { label: 'HOD', value: 'hod' },
    { label: 'Finance Officer', value: 'finance-officer' },
  ]);
  const router = useRouter();

  const onRegister = async () => {
    const res = await handleRegister({ fullName, email, password, phoneNo, role, organization, address });

    if (res.data.user) {
      setFullName('');
      setAddress('');
      setPhoneNo('');
      setEmail('');
      setPassword('');
      setRole('');
      setOrganization('');
      ToastAndroid.show('SignedIn Successfully!', ToastAndroid.SHORT);
      router.push('/');
    }
  };

  return (
    <SafeAreaView style={globalStyles.AndroidSafeArea}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={require('@/assets/images/logo-transparent.png')} style={styles.image} />
        <Text style={styles.title}>Let's Begin a new Journey!</Text>
        <View style={styles.inputView}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <CustomTextInput
              placeholder={'Enter your fullname'}
              value={fullName}
              onChangeText={setFullName}
            />
            <DropDownPicker
              placeholder='Pick your role'
              open={open}
              value={role}
              items={roles}
              setOpen={setOpen}
              setValue={setRole}
              setItems={setRoles}
              style={{
                borderColor: GlobalColors.borderLight,
                width: 145,
                backgroundColor: GlobalColors.light,
              }}
            />
          </View>
          <CustomTextInput placeholder={'Enter phone number'} value={phoneNo} onChangeText={setPhoneNo} />
          <CustomTextInput placeholder={'Enter Address'} value={address} onChangeText={setAddress} />
          {role === 'admin' && (
            <CustomTextInput
              placeholder={'Enter Organization Name'}
              value={organization}
              onChangeText={setOrganization}
            />
          )}

          <CustomTextInput placeholder={'Enter your email'} value={email} onChangeText={setEmail} />
          <CustomTextInput
            placeholder={'Enter password'}
            value={password}
            onChangeText={setPassword}
            hidden={true}
          />
        </View>
        <CustomButton onPress={onRegister} buttonText={'Register'} />

        <Text style={styles.footerText}>
          Already Have Account?
          <Link to={'/login'}>
            <Text style={styles.login}> Login</Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',
  },
  login: {
    color: GlobalColors.primary,
    fontSize: 14,
  },
});
