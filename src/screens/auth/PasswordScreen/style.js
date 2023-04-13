import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import fonts from '../../../components/fonts';

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
    fontSize: 17,
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
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  title: {
    fontFamily: fonts.main_700_o,
    fontWeight: '700',
    fontSize: 23,
    color: 'black',
    marginBottom: normalize(12),
    marginTop: normalize(25),
  },
});
