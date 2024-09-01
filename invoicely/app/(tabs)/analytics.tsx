import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AbstractChart, BarChart, LineChart, ProgressChart } from 'react-native-chart-kit';
import { chartConfig, demo_chart_data } from '@/constants/ChartConfig';
import { Dimensions } from 'react-native';
import { globalStyles } from '@/constants/GlobalStyles';
const screenWidth = Dimensions.get('window').width;
const AnalyticsScreen = () => {
  return (
    <View style={globalStyles.AndroidSafeArea}>
      <Text>Analytics</Text>
      <LineChart data={demo_chart_data} width={screenWidth - 20} height={220} chartConfig={chartConfig} />
    </View>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({});
