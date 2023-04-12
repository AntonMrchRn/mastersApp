import { StyleSheet } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    height: 38,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#EBF0F9',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  btn: {
    backgroundColor: '#EBF0F9',
    borderColor: configApp.brandColor,
    width: '50%',
    height: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  activeBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    ...configApp.shadow,
  },
  textBtn: {
    color: 'black',
    fontWeight: '400',
    fontSize: 13,
    fontFamily: fonts.main_400,
  },
  activeTextBtn: {
    color: 'black',
    fontWeight: '700',
    fontSize: 13,
    fontFamily: fonts.main_700,
  },
});
