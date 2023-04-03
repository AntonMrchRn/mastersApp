import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  wrapperCheckBox: {
    height: 21,
    width: 21,
    bottom: 2,
    borderColor: 'lightgray',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: configApp.brandColor,
    fontSize: 11,
    fontFamily: fonts.main_400,
  },
  wrapperTitleTop: {
    width: '100%',
    height: 17,
    borderBottomWidth: 0.5,
    borderBottomColor: configApp.brandColor,
    bottom: 1,
  },
  btn: {
    marginLeft: 8,
    paddingBottom: 3,
    width: '98%',
  },
});
