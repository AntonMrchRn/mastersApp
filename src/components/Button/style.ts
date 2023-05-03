import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { configApp } from '../../utils/helpers/platform';
import fonts from '../fonts';

export const styles = StyleSheet.create({
  btn: {
    backgroundColor: configApp.brandColor,
    height: 48,
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelBtn: {
    color: '#fff',
    fontFamily: fonts.main_700,
    fontWeight: '700',
    fontSize: 15,
  },
  container: {
    width: '100%',
    height: normalize(65, 'height'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
