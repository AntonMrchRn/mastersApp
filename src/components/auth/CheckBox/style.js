import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  wrapperCheckBox: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '82%',
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
