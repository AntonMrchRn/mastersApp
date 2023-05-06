import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../../utils/helpers/getFonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: configApp.ios ? 45 : 48,
    borderRadius: 8,
    backgroundColor: configApp.brandLight,
    width: '100%',
    paddingHorizontal: 15,
  },
  containerEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    height: configApp.ios ? 45 : 48,
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
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  inputBasic: {
    color: '#000',
    fontSize: 17,
    height: configApp.ios ? '100%' : '100%',
    width: configApp.ios ? '76%' : '78.3%',
    position: 'relative',
    paddingRight: 28,
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
  inputBasicEmail: {
    color: '#000',
    fontSize: 17,
    height: '100%',
    width: '100%',
    position: 'relative',
    paddingRight: 42,
    fontFamily: fonts.main_400,
    fontWeight: '400',
    paddingHorizontal: 15,
    borderRadius: 8,
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
    paddingVertical: 0,
  },
  iconPassword: {
    width: 24,
    height: 26,
  },
  btn: {
    position: 'absolute',
    right: 13,
  },
  btnClose: {
    position: 'absolute',
    right: configApp.ios ? 14 : 13,
  },
  prefixPhone: {
    color: '#5e5e5e',
    fontSize: 17,
    paddingLeft: 4,
    paddingRight: configApp.ios ? 3 : 0,
    fontFamily: fonts.main_400,
    fontWeight: '400',
    paddingTop: 0.2,
    paddingBottom: configApp.ios ? 0 : normalize(3),
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
