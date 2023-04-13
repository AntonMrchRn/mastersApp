import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: normalize(165, 'height'),
    alignItems: 'center',
    padding: 3,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  title: {
    fontFamily: fonts.main_700_o,
    fontWeight: '700',
    fontSize: 23,
    color: 'black',
  },
});
