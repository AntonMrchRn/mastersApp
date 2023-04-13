import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    bottom: 30,
    height: normalize(150, 'height'),
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: fonts.main_400,
    color: '#707070',
    textAlign: 'center',
  },
});
