import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: configApp.ios ? 30 : 20,
  },
  btn: {
    paddingVertical: 5,
  },
  labelBtn: {
    color: 'black',
    fontSize: 15,
    fontFamily: fonts.main_700,
    fontWeight: '700',
  },
});
