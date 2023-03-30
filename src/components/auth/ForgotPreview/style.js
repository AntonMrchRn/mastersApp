import { StyleSheet } from 'react-native';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    flx: 1,
    bottom: 33,
    height: 92,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 7,
    fontFamily: fonts.main_400,
    color: 'black',
    textAlign: 'center',
  },
});
