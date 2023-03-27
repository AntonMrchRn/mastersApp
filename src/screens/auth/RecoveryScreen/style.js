import { StyleSheet } from 'react-native';
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
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
});
