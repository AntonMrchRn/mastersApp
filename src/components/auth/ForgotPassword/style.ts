import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';
import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
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
  marginAndroid: {
    marginTop: 0,
  },
});

export default styles;
