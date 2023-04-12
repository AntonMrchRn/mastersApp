import { StyleSheet } from 'react-native';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
    height: 28,
  },
  btn: {
    paddingVertical: 5,
  },
  labelBtn: {
    color: 'black',
    fontSize: 14,
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
});
