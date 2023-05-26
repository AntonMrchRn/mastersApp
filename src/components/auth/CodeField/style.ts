import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import fonts from '../../../utils/helpers/getFonts';

export const styles = StyleSheet.create({
  root: {
    height: normalize(30, 'height'),
    justifyContent: 'center',
  },
  bottomWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(35, 'height'),
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 50,
  },
  wrapperCircle: {
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
