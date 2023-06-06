import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';
import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  wrapper: {
    width: '100%',
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: fonts.main_400,
    color: '#707070',
    textAlign: 'center',
    paddingBottom: configApp.ios ? 0 : 3,
  },
});

export default styles;
