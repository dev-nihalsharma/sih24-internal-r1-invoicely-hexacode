import InvoiceCard from '@/components/InvoiceCard';
import { GlobalColors } from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyles';
import { fetchMyInvoicesFromApi } from '@/hooks/actions/invoiceActions';
import { onLogout } from '@/hooks/actions/userActions';
import { storage } from '@/hooks/localStorage';
import { Icon } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const [user, setUser] = useState({} as User);
  const [invoices, setInvoices] = useState([] as Invoice[]);
  const router = useRouter();

  useEffect(() => {
    const fetchInvoices = async () => {
      const invoices = await fetchMyInvoicesFromApi();

      setInvoices(invoices);
    };
    const getUserInfo = async () => {
      const user = await storage.retrieveData('user');

      setUser(JSON.parse(user!));
    };

    getUserInfo();
    fetchInvoices();
  }, []);

  return (
    <SafeAreaView style={globalStyles.AndroidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 10 }}>
          <Image
            style={{ borderRadius: 50, width: 100, height: 100 }}
            source={require('@/assets/images/default-pfp.png')}
          ></Image>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <Text style={{ fontSize: 25 }}>{user.fullName}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <Text
                style={{
                  backgroundColor: GlobalColors.secondary,
                  color: '#fff',
                  borderRadius: 20,
                  fontSize: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                {user.role}
              </Text>
              <Text
                style={{
                  backgroundColor: GlobalColors.secondary,
                  color: '#fff',
                  borderRadius: 20,
                  fontSize: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                {user.organization}
              </Text>
            </View>
            <View
              style={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', marginTop: 5 }}
            >
              <Text style={{ color: GlobalColors.grayDark }}>{user.phoneNo}|</Text>
              <Text style={{ color: GlobalColors.grayDark }}>{user.email}</Text>
            </View>
            <Text style={{ color: GlobalColors.grayDark }}>{user.address} </Text>
          </View>
          <Icon
            borderRadius={50}
            style={{ marginTop: 10 }}
            name='logout'
            type='material'
            color={GlobalColors.secondary}
            onPress={() => onLogout(router)}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={globalStyles.subtitle}>Your Invoices</Text>
          {invoices ? (
            <View>
              {invoices.map((invoice) => (
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  invoicesList={invoices}
                  setInvoicesList={setInvoices}
                />
              ))}
            </View>
          ) : (
            <View
              style={{
                padding: 10,
                borderRadius: 20,
                height: 100,
                marginVertical: 10,
                backgroundColor: GlobalColors.light,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>No invoices available!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
