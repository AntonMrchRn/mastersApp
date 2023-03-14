import { StyleSheet } from 'react-native';
import { configApp } from '../../utils/helpers/platform';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: configApp.brandColor,
    height: 40,
    width: '47%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: { backgroundColor: configApp.disabled },
  activeBtn: {
    backgroundColor: configApp.brandColor,
  },
  labelBtn: {
    color: '#fff',
  },
  activeTextBtn: {
    color: configApp.brandColor,
  },
});
