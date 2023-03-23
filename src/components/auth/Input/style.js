import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';

export const styles = StyleSheet.create({
  container: {
    borderColor: 'lightgray',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 5,
    backgroundColor: configApp.brandLight,
    marginBottom: 15,
    width: '100%',
  },
  inputBasic: {
    color: '#000',
    fontSize: 14,
    height: '100%',
    width: '100%',
    position: 'relative',
    paddingRight: 28,
    fontFamily: 'Montserrat-Black',
    fontWeight: '500',
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
    color: '#000',
    fontSize: 14,
    paddingLeft: 4,
    paddingRight: configApp.ios ? 3 : 0,
    fontFamily: 'Montserrat-Black',
    fontWeight: '500',
  },
  activeInput: {
    borderColor: configApp.brandColor,
  },
  icon: {
    width: 23,
    height: 23,
    marginRight: 5,
  },
});
