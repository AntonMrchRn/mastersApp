import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    bottom: 30,
    height: 105,
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: configApp.ios ? 13 : 12,
    fontWeight: '400',
    paddingBottom: 7,
    fontFamily: fonts.main_400,
    color: 'black',
    textAlign: 'center',
  },
});
