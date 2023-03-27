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
    width: '47%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: { backgroundColor: configApp.disabled },
  activeBtn: {
    backgroundColor: configApp.brandColor,
  },
  labelBtn: {
    color: '#fff',
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
  activeTextBtn: {
    color: configApp.brandColor,
  },
});
