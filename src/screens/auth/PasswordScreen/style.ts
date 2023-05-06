import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import fonts from '../../../utils/helpers/getFonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  wrapperSignIn: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: fonts.main_400,
    color: '#707070',
    textAlign: 'center',
  },
  containerInfo: {
    width: '100%',
    height: normalize(325, 'height'),
    alignItems: 'center',
    padding: 3,
    justifyContent: 'flex-start',
    paddingVertical: 25,
  },
  title: {
    fontFamily: fonts.main_700_o,
    fontWeight: '700',
    fontSize: 22,
    color: 'black',
    marginBottom: normalize(12),
    marginTop: normalize(25),
  },
});
