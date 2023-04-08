import { StyleSheet } from 'react-native';
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
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
