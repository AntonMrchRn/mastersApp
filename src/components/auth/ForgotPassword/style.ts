import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    paddingVertical: 5,
  },
  labelBtn: {
    color: 'black',
    fontSize: 17,
    fontFamily: fonts.main_700,
    fontWeight: '700',
  },
  marginAndroid: {
    marginTop: 0,
  },
});

export default styles;
