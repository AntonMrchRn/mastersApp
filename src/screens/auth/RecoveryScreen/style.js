import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import fonts from '../../../components/fonts';
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
  // bottomWrapper: {
  //   width: '100%',
  //   height: normalize(configApp.ios ? 220 : 200, 'height'),
  //   justifyContent: 'center',
  // },
  wrapperCenter: {
    width: '100%',
    height: '45%',
  },
  containerError: {
    width: '100%',
    height: 40,
    justifyContent: 'flex-start',
  },
  containerTimer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '400',
    fontSize: configApp.ios ? 14 : 12,
  },
});
