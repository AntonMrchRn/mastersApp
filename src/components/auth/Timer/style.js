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
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
  },
  btnRepeatCode: {
    marginTop: 25,
  },
  textBtn: {
    fontSize: 14,
    color: configApp.brandColor,
  },
});
