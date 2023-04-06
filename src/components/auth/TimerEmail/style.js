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
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '500',
  },
  btnRepeatCode: {
    marginTop: 25,
  },
  textBtn: {
    fontSize: 13,
    color: configApp.brandColor,
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
});
