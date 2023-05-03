import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    bottom: 20,
    // height: configApp.ios ? normalize(50, 'height') : normalize(120, 'height'),
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: fonts.main_400,
    color: '#707070',
    textAlign: 'center',
  },
});
