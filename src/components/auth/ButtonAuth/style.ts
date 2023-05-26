import { StyleSheet } from 'react-native';

import fonts from '../../../utils/helpers/getFonts';
import { configApp } from '../../../utils/helpers/platform';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: configApp.brandColor,
    height: 48,
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
