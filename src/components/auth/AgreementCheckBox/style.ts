import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';
import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  active: {
    backgroundColor: configApp.brandColor,
  },
  title: {
    fontWeight: '400',
    color: 'black',
    fontSize: 15,
    fontFamily: fonts.main_400,
  },
  titlePress: {
    fontWeight: '400',
    color: configApp.brandColor,
    fontSize: 15,
    fontFamily: fonts.main_400,
  },
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 10,
    width: '100%',
  },
});

export default styles;
