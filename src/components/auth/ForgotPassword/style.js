import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 5,
    height: 28,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderBottomColor: configApp.brandColor,
    borderBottomWidth: 0.5,
  },
  labelBtn: {
    color: configApp.brandColor,
    fontSize: 13,
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
});
