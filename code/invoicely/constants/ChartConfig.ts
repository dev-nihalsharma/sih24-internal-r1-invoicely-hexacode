import { GlobalColors } from './Colors';

export const chartConfigGreen = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#1E2923',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(50, 168, 78, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
export const chartConfigBlue = {
  backgroundGradientFrom: '#1e2129',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#1b316b',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(252, 121, 121, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
export const chartConfig = {
  backgroundGradientFrom: '#1e2129',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#1b316b',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export const demo_chart_data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Monthly Earning'], // optional
};

export const stacked_demo_data = {
  labels: ['Test1', 'Test2'],
  legend: ['L1', 'L2', 'L3'],
  data: [
    [60, 60, 60],
    [30, 30, 60],
  ],
  barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
};
