import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { storage } from '@/hooks/localStorage';
import { globalStyles } from '@/constants/GlobalStyles';
import { useRouter } from 'expo-router';
import InvoiceCard from '@/components/InvoiceCard';
import { fetchInvoicesFromApi } from '@/hooks/actions/invoiceActions';
import { GlobalColors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const InvoicesScreen = () => {
  const [invoices, setInvoices] = useState([] as Invoice[]);
  const router = useRouter();
  useEffect(() => {
    const fetchInvoices = async () => {
      const invoices = await fetchInvoicesFromApi();

      setInvoices(invoices);
    };

    fetchInvoices();
  }, []);

  return (
    <SafeAreaView style={globalStyles.AndroidSafeArea}>
      <View style={{ marginBottom: 10 }}>
        <Button title='Create Invoice' onPress={() => router.replace('/')} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={globalStyles.subtitle}>Organization Invoices</Text>
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
};

export default InvoicesScreen;

const styles = StyleSheet.create({});
