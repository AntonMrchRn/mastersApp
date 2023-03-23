import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';

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
    fontFamily: 'Montserrat-Regular',
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
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  btnRepeatCode: {
    marginTop: 25,
  },
  textBtn: {
    fontSize: 13,
    color: configApp.brandColor,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
  },
});
