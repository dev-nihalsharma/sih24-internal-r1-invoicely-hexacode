import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalColors } from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyles';
import { Icon } from '@rneui/base';

interface InvoiceCard {
  invoice: Invoice;
}

const InvoiceCard = ({ invoice }: InvoiceCard) => {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 20,
        height: 70,
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
          <Text style={{ color: 'gray' }}>To: {invoice.toName}</Text>
          <Text style={{ color: '#5dc968' }}>Total: ₹{invoice.totalAmount}</Text>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Icon name='edit' type='material' color={GlobalColors.secondary} onPress={() => {}} />
        <Icon
          borderRadius={50}
          name='download'
          type='material'
          color={GlobalColors.secondary}
          onPress={() => {}}
        />
        <Icon
          borderRadius={50}
          name='print'
          type='material'
          color={GlobalColors.secondary}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({});
