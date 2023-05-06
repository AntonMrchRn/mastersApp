import { StyleSheet } from 'react-native';
import fonts from '../../../utils/helpers/getFonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 3,
    justifyContent: 'flex-end',
    paddingVertical: 25,
  },
  title: {
    fontFamily: fonts.main_700_o,
    fontWeight: '700',
    fontSize: 23,
    color: 'black',
  },
});
