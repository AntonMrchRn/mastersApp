import { StyleSheet } from 'react-native';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    bottom: 20,
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
