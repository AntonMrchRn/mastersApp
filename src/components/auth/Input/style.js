import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    backgroundColor: configApp.brandLight,
    width: '100%',
    paddingHorizontal: 10,
  },
  containerEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    backgroundColor: configApp.brandLight,
    width: '100%',
  },
  error: {
    backgroundColor: '#FEEDEE',
    borderColor: '#EB142D',
    borderWidth: 0.8,
  },
  containerPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    backgroundColor: configApp.brandLight,
    width: '100%',
  },
  inputBasic: {
    color: '#000',
    fontSize: 14,
    height: '100%',
    width: configApp.ios ? '77.3%' : '79.8%',
    position: 'relative',
    paddingRight: 28,
    fontFamily: fonts.main_400,
    fontWeight: '400',
    paddingTop: configApp.ios ? 0 : normalize(12.5),
  },
  inputBasicEmail: {
    color: '#000',
    fontSize: 14,
    height: '100%',
    width: configApp.ios ? '90.1%' : '91%',
    position: 'relative',
    paddingRight: 28,
    fontFamily: fonts.main_400,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  inputBasicPassword: {
    color: '#000',
    fontSize: 14,
    height: '100%',
    width: '100%',
    position: 'relative',
    paddingRight: 38,
    fontFamily: fonts.main_400,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  iconPassword: {
    width: 23,
    height: 23,
  },
  btn: {
    position: 'absolute',
    right: 10,
  },
  prefixPhone: {
    color: '#5e5e5e',
    fontSize: 14,
    paddingLeft: 4,
    paddingRight: configApp.ios ? 3 : 0,
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
  activePrefix: {
    color: '#000',
  },
  errorPrefix: {
    color: '#EB142D',
  },
  errorText: {
    color: '#EB142D',
  },
  activeInput: {
    borderColor: configApp.brandColor,
    borderWidth: 1,
  },
  icon: {
    width: 23,
    height: 23,
    marginRight: 5,
  },
  wrapper: {
    width: '100%',
    marginBottom: 15,
  },
});
