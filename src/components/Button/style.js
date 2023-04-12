import { StyleSheet } from 'react-native';
import { configApp } from '../../utils/helpers/platform';
import fonts from '../fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: configApp.brandColor,
    height: 42,
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: { backgroundColor: '#ACB8F8' },
  activeBtn: {
    backgroundColor: configApp.brandColor,
  },
  labelBtn: {
    color: '#fff',
    fontFamily: fonts.main_700,
    fontWeight: '700',
    fontSize: 15,
  },
  activeTextBtn: {
    color: configApp.brandColor,
  },
});
