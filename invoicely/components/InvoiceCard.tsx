import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React from 'react';
import { GlobalColors } from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyles';
import { Icon } from '@rneui/base';
import { deleteInvoice, printToFile } from '@/hooks/actions/invoiceActions';

interface InvoiceCard {
  invoice: Invoice;
  setInvoicesList?: any;
  invoicesList?: any;
}

const InvoiceCard = ({ invoice, setInvoicesList, invoicesList }: InvoiceCard) => {
  const onDeleteInvoice = async () => {
    const res = await deleteInvoice(invoice.id);

    if (res.error) {
      ToastAndroid.show('Failed to delete invoice', ToastAndroid.SHORT);
      return;
    }
    const updatedInvoicesList = invoicesList.filter((i: any) => i.id !== invoice.id);
    ToastAndroid.show('Invoice Deleted Successfully', ToastAndroid.SHORT);
    setInvoicesList(updatedInvoicesList);
  };

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 20,
        height: 100,
        marginVertical: 5,
        backgroundColor: GlobalColors.light,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Text style={{ ...globalStyles.subtitle, color: GlobalColors.grayDark }}>{invoice.invoiceName}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <Text style={{ color: GlobalColors.grayLight }}>From: {invoice.fromName} |</Text>
          <Text style={{ color: GlobalColors.grayLight }}>To: {invoice.toName}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <Text style={{ color: GlobalColors.secondary }}>{invoice.date}</Text>
          <Text style={{ color: '#5dc968' }}>Total: ₹{invoice.totalAmount}</Text>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Icon name='edit' type='material' color={GlobalColors.secondary} onPress={() => {}} />
        <Icon
          borderRadius={50}
          name='print'
          type='material'
          color={GlobalColors.secondary}
          onPress={() => printToFile(invoice)}
        />
        <Icon
          borderRadius={50}
          name='delete'
          type='material'
          color={GlobalColors.secondary}
          onPress={() => onDeleteInvoice()}
        />
      </View>
    </View>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({});
