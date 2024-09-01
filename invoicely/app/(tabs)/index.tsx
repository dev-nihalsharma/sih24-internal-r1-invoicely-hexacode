import CustomTextInput from '@/components/CustomTextInput';
import InvoiceCard from '@/components/InvoiceCard';
import { GlobalColors } from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyles';
import { createInvoice, fetchInvoicesFromApi } from '@/hooks/actions/invoiceActions';
import { storage } from '@/hooks/localStorage';
import { Icon } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DashboardScreen() {
  const [open, setOpen] = useState(false);
  const [recentInvoices, setRecentInvoices] = useState([] as Invoice[]);
  const [invoiceType, setInvoiceType] = useState('individual_invoice');
  const [invoiceTypes, setInvoiceTypes] = useState([
    { label: 'Individual', value: 'individual' },
    { label: 'Individual Hourly', value: 'individual hourly' },
    { label: 'Company', value: 'company' },
    { label: 'Company Hourly', value: 'company hourly' },
  ]);
  const [billToName, setBillToName] = useState('');
  const [billToAddress, setBillToAddress] = useState('');
  const [billToPhone, setBillToPhone] = useState('');
  const [billFromName, setBillFromName] = useState('');
  const [billFromAddress, setBillFromAddress] = useState('');
  const [billFromPhone, setBillFromPhone] = useState('');
  const [invoiceName, setInvoiceName] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([{}] as InvoiceItem[]);
  const router = useRouter();

  const onSaveInvoice = async () => {
    const all_prices = invoiceItems.map((invoiceItem) => invoiceItem.price);

    let sum = 0;

    // Calculation the sum using forEach
    all_prices.forEach((x) => {
      sum += parseInt(x);
    });

    const res = await createInvoice({
      invoiceName,
      invoiceType,
      fromName: billFromName,
      fromAddress: billFromAddress,
      fromPhone: billFromPhone,
      toName: billToName,
      toPhone: billToPhone,
      toAddress: billToAddress,
      invoiceItems,
      totalAmount: sum.toString(),
    });

    if (!res.error) {
      setInvoiceName('');
      setBillFromName('');
      setBillFromAddress('');
      setBillToName('');
      setBillToAddress('');
      setBillToPhone('');
      setBillFromPhone('');
      setInvoiceItems([]);

      setRecentInvoices([res.data, ...recentInvoices]);

      ToastAndroid.show('Invoice Created Successfully!', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const storedUser = await storage.retrieveData('user');

      if (!storedUser) {
        router.push('/login');
        return;
      }

      const user = await JSON.parse(storedUser);
      setBillFromName(user.fullName);
      setBillFromAddress(user.address);
      setBillFromPhone(user.phoneNo);
    };

    const fetchInvoices = async () => {
      const invoices = await fetchInvoicesFromApi();
      const recentInvoices = invoices?.slice(0, invoices.length > 5 ? 5 : invoices.length);

      setRecentInvoices(recentInvoices as any);
    };

    getUserDetails();
    fetchInvoices();
  }, []);

  return (
    <SafeAreaView style={globalStyles.AndroidSafeArea}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          alignItems: 'center',
        }}
      >
        <DropDownPicker
          placeholder='Invoice Type'
          open={open}
          value={invoiceType}
          items={invoiceTypes}
          setOpen={setOpen}
          setValue={setInvoiceType}
          setItems={setInvoiceTypes}
          style={{ borderColor: GlobalColors.borderLight }}
        />
      </View>
      <View
        style={{
          backgroundColor: GlobalColors.secondary,
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
          gap: 10,
        }}
      >
        <Text style={globalStyles.subtitle_white}>Bill From</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            width: '100%',
          }}
        >
          <CustomTextInput
            placeholder='Name'
            backgroundWhite={true}
            value={billFromName}
            onChangeText={setBillFromName}
          ></CustomTextInput>
          <CustomTextInput
            placeholder='Phone'
            backgroundWhite={true}
            value={billFromPhone}
            onChangeText={setBillFromPhone}
          ></CustomTextInput>
        </View>
        <CustomTextInput
          placeholder='Address'
          backgroundWhite={true}
          value={billFromAddress}
          onChangeText={setBillFromAddress}
        ></CustomTextInput>
        <Text style={globalStyles.subtitle_white}>Bill To</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
          <CustomTextInput
            placeholder='Name'
            value={billToName}
            backgroundWhite={true}
            onChangeText={setBillToName}
          ></CustomTextInput>
          <CustomTextInput
            placeholder='Phone'
            backgroundWhite={true}
            value={billToPhone}
            onChangeText={setBillToPhone}
          ></CustomTextInput>
        </View>
        <CustomTextInput
          placeholder='Address'
          value={billToAddress}
          backgroundWhite={true}
          onChangeText={setBillToAddress}
        ></CustomTextInput>
        <Text style={globalStyles.subtitle_white}>Invoice Items</Text>
        {invoiceItems.map((item, index) => (
          <View key={index} style={{ display: 'flex', flexDirection: 'row', gap: 4, width: '100%' }}>
            <CustomTextInput
              backgroundWhite={true}
              placeholder='Description'
              value={item.description}
              onChangeText={(description) =>
                setInvoiceItems(
                  invoiceItems.map((i, iIndex) => (iIndex === index ? { ...i, description } : i))
                )
              }
            />

            {(invoiceType === 'individual_invoice_hourly' || invoiceType === 'company_invoice_hourly') && (
              <CustomTextInput
                placeholder='Hours'
                backgroundWhite={true}
                value={item.hours!}
                onChangeText={(hours) =>
                  setInvoiceItems(
                    invoiceItems.map((i, iIndex) => (iIndex === index ? { ...i, hours: hours } : i))
                  )
                }
              />
            )}

            <CustomTextInput
              placeholder='Price'
              value={item.price}
              onChangeText={(price) => {
                setInvoiceItems(
                  invoiceItems.map((i, iIndex) => (iIndex === index ? { ...i, price: price } : i))
                );
              }}
              backgroundWhite={true}
            />
          </View>
        ))}
        <Icon
          raised
          borderRadius={50}
          name='add'
          type='material'
          color={GlobalColors.secondary}
          onPress={() => setInvoiceItems([...invoiceItems, { description: '', price: '' }])}
        />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <CustomTextInput
            placeholder='Invoice Name'
            backgroundWhite={true}
            value={invoiceName}
            onChangeText={setInvoiceName}
          ></CustomTextInput>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'flex-end' }}>
          <Button title='Save' onPress={() => onSaveInvoice()}></Button>
          <Button title='Download & Print '></Button>
        </View>
      </View>

      <View>
        <Text style={globalStyles.subtitle}>Recent Invoices</Text>
        {recentInvoices ? (
          <View>
            {recentInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </View>
        ) : (
          <View
            style={{
              padding: 10,
              borderRadius: 20,
              height: 100,

              backgroundColor: GlobalColors.light,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No recent invoices available!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
