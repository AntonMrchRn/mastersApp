import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  root: { paddingBottom: 20, width: '100%' },
  cell: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: fonts.main_400,
    color: 'black',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ebf0f9',
    width: 40,
    height: 40,
  },
  focusWrapper: {
    borderWidth: 1,
    borderColor: configApp.brandColor,
  },
});
