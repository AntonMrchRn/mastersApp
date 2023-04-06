import { Platform, StyleSheet } from 'react-native';
import fonts from '../../../components/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperSignIn: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 375,
  },
  containerError: {
    width: '100%',
    height: 40,
    justifyContent: 'flex-start',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '400',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
  },
});
