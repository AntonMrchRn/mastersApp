import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';

export const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#fff',
    borderColor: configApp.brandColor,
    borderWidth: 1,
    borderRadius: 5,
    width: '47%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBtn: {
    backgroundColor: configApp.brandColor,
  },
  textBtn: {
    color: configApp.brandColor,
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  activeTextBtn: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});
