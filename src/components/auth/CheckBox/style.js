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
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  wrapperCheckBoxAndroid: {
    height: 19,
    width: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    position: 'relative',
  },
  checkBoxAndroid: {
    height: 23,
    width: 20,
    position: 'absolute',
    top: -3,
    left: -7,
  },
  active: {
    borderColor: configApp.brandColor,
  },
  activeAndroid: {
    borderColor: 'white',
  },
  checkBox: {
    height: 23,
    width: 21,
  },
  title: {
    fontWeight: '400',
    color: configApp.brandColor,
    fontSize: Platform.OS === 'ios' ? 12 : 11,
    fontFamily: fonts.main_400,
  },
  wrapperTitleTop: {
    width: Platform.OS === 'ios' ? '87%' : '80%',
    height: 17,
    borderBottomWidth: 0.5,
    borderBottomColor: configApp.brandColor,
    bottom: 1,
  },
  wrapperTitleBottom: {
    width: Platform.OS === 'ios' ? '71%' : '67%',
    height: 17,
    borderBottomWidth: 0.5,
    borderBottomColor: configApp.brandColor,
  },
  btn: {
    marginLeft: 10,
    paddingBottom: 3,
    width: 200,
  },
});
