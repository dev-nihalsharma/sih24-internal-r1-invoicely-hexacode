import {
  chartConfig,
  chartConfigBlue,
  chartConfigGreen,
  demo_chart_data,
  stacked_demo_data,
} from '@/constants/ChartConfig';
import { GlobalColors } from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyles';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { BarChart, LineChart, ProgressChart, StackedBarChart } from 'react-native-chart-kit';
import DropDownPicker from 'react-native-dropdown-picker';
const screenWidth = Dimensions.get('window').width;
const AnalyticsScreen = () => {
  const [open, setOpen] = useState(false);
  const [analyticsRanges, setAnalyticsRanges] = useState([
    { label: 'Today', value: 'date' },
    { label: 'This Month', value: 'month' },
    { label: 'This Year', value: 'year' },
  ]);
  const [analyticsRange, setAnalyticsRange] = useState('month');

  const data = {
    labels: ['Swim', 'Bike', 'Run'], // optional
    data: [0.4, 0.6, 0.8],
  };
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
          value={analyticsRange}
          items={analyticsRanges}
          setOpen={setOpen}
          setValue={setAnalyticsRange}
          setItems={setAnalyticsRanges}
          style={{ borderColor: GlobalColors.borderLight }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ ...globalStyles.subtitle, color: '#5dc968' }}>Total Earnings: ₹5,00,000</Text>
        <LineChart
          data={demo_chart_data}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfigGreen}
          style={{ borderRadius: 20, marginVertical: 10 }}
          yAxisLabel='₹'
          bezier
          transparent
        />

        <Text style={{ ...globalStyles.subtitle, color: GlobalColors.secondary }}>Total Bills Made: 670</Text>
        <BarChart
          data={demo_chart_data}
          width={screenWidth - 20}
          height={240}
          chartConfig={chartConfigBlue}
          style={{ borderRadius: 20, marginVertical: 10 }}
          showValuesOnTopOfBars={true}
          yAxisLabel=''
          yAxisSuffix=''
        />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <StackedBarChart
            style={{ borderRadius: 20, marginVertical: 10 }}
            data={stacked_demo_data}
            width={180}
            height={180}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <ProgressChart
            data={data}
            width={240}
            height={180}
            strokeWidth={10}
            radius={20}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({});
