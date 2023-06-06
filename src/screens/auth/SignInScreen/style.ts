import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { configApp } from '@/constants/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperSignIn: {
    height: normalize(configApp.ios ? 560 : 620, 'height'),
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  marginTopAndroid: {
    marginTop: 16,
  },
  androidHeight: {
    height: normalize(255, 'height'),
  },
  bottomWrapper: {
    width: '100%',
    height: normalize(configApp.ios ? 245 : 290, 'height'),
    justifyContent: 'center',
  },
  wrapperCenter: {
    width: '100%',
    height: configApp.ios ? '45%' : normalize(240, 'height'),
  },
  input: {
    paddingRight: 8,
  },
});

export default styles;
