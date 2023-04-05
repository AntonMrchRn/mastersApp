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
    justifyContent: 'center',
  },
  wrapperCheckBox: {
    height: 21,
    width: 21,
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
    color: 'black',
    fontSize: configApp.ios ? 11 : 10,
    fontFamily: fonts.main_400,
  },
  titlePress: {
    fontWeight: '400',
    color: configApp.brandColor,
    fontSize: configApp.ios ? 11 : 10,
    fontFamily: fonts.main_400,
  },
  wrapper: {
    width: configApp.ios ? '90%' : '90%',
    height: configApp.ios ? 45 : 42,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
