import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../../utils/helpers/getFonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: normalize(configApp.ios ? 45 : 85, 'height'),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  wrapperCheckBox: {
    width: normalize(22, 'width'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  active: {
    borderColor: configApp.brandColor,
  },
  checkBox: {
    height: 10,
    width: 10,
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
