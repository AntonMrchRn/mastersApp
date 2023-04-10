import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  text: {
    fontSize: configApp.ios ? 13 : 12,
    fontWeight: '400',
    paddingBottom: 7,
    textAlign: 'center',
    fontFamily: fonts.main_400,
    color: 'black',
  },
});
