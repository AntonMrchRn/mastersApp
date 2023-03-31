import { StyleSheet } from 'react-native';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    bottom: 18,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 110,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 7,
    textAlign: 'center',
    fontFamily: fonts.main_400,
    color: 'black',
  },
});
