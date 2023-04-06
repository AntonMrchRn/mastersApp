import { StyleSheet } from 'react-native';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  btnClose: {
    width: '90%',
    height: '80%',
    backgroundColor: '#3f51b5',
    justifyContent: 'center',
    borderRadius: 12,
  },
  titleInfo: {
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingBottom: 20,
    color: 'black',
    fontFamily: fonts.main_400,
    fontWeight: '400',
    top: 7,
    fontSize: 13,
  },
  containerBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    textAlign: 'center',
    color: 'white',
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
  titleInfoPhone: {
    color: 'black',
    fontSize: 17,
    top: 7,
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '400',
    paddingBottom: 20,
  },
  containerBtnPhone: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtnPhone: {
    textAlign: 'center',
    color: 'white',
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
});
