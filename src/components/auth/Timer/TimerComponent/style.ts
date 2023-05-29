import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';
import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
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
  heightAndroid: {
    height: 45,
  },
  timeFormatStyle: {
    textAlign: 'center',
  },
  link: {
    fontSize: 20,
    color: 'blue',
  },
  wrapperAndroid: {
    height: 45,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: '100%',
  },
  timer: {
    fontSize: 17,
    color: '#D5D5D6',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '700',
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

export default styles;
