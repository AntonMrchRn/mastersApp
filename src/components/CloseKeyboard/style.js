import { StyleSheet } from 'react-native';
import { configApp } from '../../utils/helpers/platform';
import fonts from '../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#f5f5f5',
    borderTopColor: '#E7E7E7',
    borderTopWidth: 1,
    paddingHorizontal: 18,
    position: 'absolute',
    height: 40,
  },
  btn: {
    paddingHorizontal: 5,
  },
  readyTitle: {
    color: configApp.brandColor,
    fontFamily: fonts.main_400,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 8,
  },
});
