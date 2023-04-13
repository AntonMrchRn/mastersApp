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
    paddingHorizontal: 15,
  },
  containerEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    backgroundColor: configApp.brandLight,
    width: '100%',
    paddingHorizontal: 15,
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
    paddingHorizontal: 10,
  },
  inputBasic: {
    color: '#000',
    fontSize: 17,
    height: '100%',
    width: configApp.ios ? '76%' : '79.8%',
    position: 'relative',
    paddingRight: 28,
    fontFamily: fonts.main_400,
    fontWeight: '400',
    paddingTop: configApp.ios ? 0 : normalize(12.5),
  },
  inputBasicEmail: {
    color: '#000',
    fontSize: 17,
    height: '100%',
    width: configApp.ios ? '93.1%' : '91%',
    position: 'relative',
    paddingRight: 4,
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
  inputBasicPassword: {
    color: '#000',
    fontSize: 17,
    height: '100%',
    width: '100%',
    position: 'relative',
    paddingRight: 32,
    fontFamily: fonts.main_400,
    fontWeight: '400',
    paddingHorizontal: 5,
  },
  iconPassword: {
    width: 24,
    height: 26,
  },
  btn: {
    position: 'absolute',
    right: 13,
  },
  prefixPhone: {
    color: '#5e5e5e',
    fontSize: 17,
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
    height: 24,
    marginRight: 5,
  },
  wrapper: {
    width: '100%',
    marginBottom: 15,
  },
});
