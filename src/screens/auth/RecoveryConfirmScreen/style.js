import { StyleSheet } from 'react-native';
import fonts from '../../../components/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperSignIn: {
    // flex: 2,
    height: '100%',
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerError: {
    width: '100%',
    height: 40,
    justifyContent: 'flex-start',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
});
