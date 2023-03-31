import { Platform, StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  wrapperCheckBox: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  active: {
    borderColor: configApp.brandColor,
  },
  checkBox: {
    height: 23,
    width: 21,
    marginRight: Platform.OS === 'ios' ? 0 : 5,
  },
  title: {
    fontWeight: '400',
    color: configApp.brandColor,
    fontSize: Platform.OS === 'ios' ? 12 : 11,
    fontFamily: fonts.main_400,
    textDecorationLine: 'underline',
  },
  btn: {
    marginLeft: 10,
    paddingBottom: 3,
    width: 200,
  },
});
