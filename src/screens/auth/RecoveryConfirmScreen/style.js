import { Platform, StyleSheet } from 'react-native';
import fonts from '../../../components/fonts';
import { configApp } from '../../../utils/helpers/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerKeyBoard: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperSignInContainer: {
    flex: configApp.ios ? 0.8 : 1,
    alignItems: 'center',
    justifyContent: configApp.ios ? 'flex-end' : 'center',
    padding: 15,
    width: '100%',
  },
  wrapperSignIn: {
    flex: 1,
    alignItems: 'center',
  },
  containerError: {
    width: '100%',
    height: 40,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '400',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
  },
});
