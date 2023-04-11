import { Platform, StyleSheet } from 'react-native';
import fonts from '../../../components/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerKeyboard: {
    width: '100%',
    flex: 1,
  },
  wrapperSignIn: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    width: '100%',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '400',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
  },
  containerError: {
    width: '100%',
    height: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
