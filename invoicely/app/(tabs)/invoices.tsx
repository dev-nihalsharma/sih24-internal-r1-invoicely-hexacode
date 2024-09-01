import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { storage } from '@/hooks/localStorage';
import { globalStyles } from '@/constants/GlobalStyles';
import { useRouter } from 'expo-router';
import InvoiceCard from '@/components/InvoiceCard';
import { fetchInvoicesFromApi } from '@/hooks/actions/invoiceActions';
import { GlobalColors } from '@/constants/Colors';

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
    <View style={globalStyles.AndroidSafeArea}>
      <View style={{ marginVertical: 20 }}>
        <Button title='add' onPress={() => router.replace('/')} />
      </View>
      <View>
        <Text style={globalStyles.subtitle}>Recent Invoices</Text>
        {invoices.length > 0 ? (
          <View>
            {invoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
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
    </View>
  );
};

export default InvoicesScreen;

const styles = StyleSheet.create({});
