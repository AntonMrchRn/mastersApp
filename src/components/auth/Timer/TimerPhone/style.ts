import { StyleSheet } from 'react-native';
import fonts from '../../../../utils/helpers/getFonts';

export const styles = StyleSheet.create({
  heightAndroid: {
    height: 45,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: '100%',
  },
  btnRepeatCode: {
    padding: 5,
  },
  textBtn: {
    fontSize: 17,
    color: '#1B1B1B',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '700',
  },
});
