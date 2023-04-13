import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  root: {
    width: '70%',
    height: normalize(70, 'height'),
    justifyContent: 'flex-start',
  },
  cell: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: fonts.main_700_o,
    color: '#1B1B1B',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 40,
    height: 40,
  },
  wrapperСircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: '#D5D5D6',
  },
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
