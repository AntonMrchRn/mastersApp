import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { configApp } from '../../../utils/helpers/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperSignIn: {
    height: normalize(configApp.ios ? 560 : 590, 'height'),
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  bottomWrapper: {
    width: '100%',
    height: normalize(configApp.ios ? 190 : 180, 'height'),
    justifyContent: 'center',
  },
  wrapperCenter: {
    width: '100%',
    height: '45%',
  },
});
