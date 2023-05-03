import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: normalize(configApp.ios ? 150 : 185, 'height'),
    justifyContent: 'flex-end',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 12,
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: fonts.main_400,
    color: '#707070',
    textAlign: 'center',
    paddingBottom: configApp.ios ? 0 : 3,
  },
});
