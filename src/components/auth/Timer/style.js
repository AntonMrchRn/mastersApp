import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 16,
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
  link: {
    fontSize: 20,
    color: 'blue',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: '100%',
  },
  timer: {
    fontSize: 17,
    color: '#D5D5D6',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '700',
  },
  btnRepeatCode: {
    padding: 5,
  },
  textBtn: {
    fontSize: 17,
    color: '#1B1B1B',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '700',
  },
});
