import { StyleSheet, Platform, StatusBar } from 'react-native';
import { GlobalColors } from './Colors';

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalColors.gray,
  },
  subtitle_white: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalColors.white,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
  },

  container: {
    flex: 1,
    padding: 10,
  },
});
