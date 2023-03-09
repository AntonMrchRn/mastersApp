import { StyleSheet } from 'react-native';
import { configApp } from '../../../helpers/platform';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 30,
    marginTop: 5,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderBottomColor: configApp.brandColor,
    borderBottomWidth: 0.5,
  },
  labelBtn: {
    color: configApp.brandColor,
    fontSize: 14,
  },
});
