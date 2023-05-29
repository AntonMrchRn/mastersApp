import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { fonts } from '@/constants/fonts';
import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
  container: {
    height: configApp.ios ? normalize(28, 'height') : normalize(35, 'height'),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#EBF0F9',
    borderRadius: 7,
  },
  btn: {
    backgroundColor: '#EBF0F9',
    borderColor: configApp.brandColor,
    width: '50%',
    height: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  activeBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    ...configApp.shadow,
    borderColor: '#3F51B5',
    borderWidth: 1,
  },
  textBtn: {
    color: 'black',
    fontWeight: '400',
    fontSize: 13,
    fontFamily: fonts.main_400,
  },
  activeTextBtn: {
    color: 'black',
    fontWeight: '700',
    fontSize: 13,
    fontFamily: fonts.main_700,
  },
});

export default styles;
