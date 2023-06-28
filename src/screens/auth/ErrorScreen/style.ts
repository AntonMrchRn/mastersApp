import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import { fonts } from '@/constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperSignIn: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    padding: 15,
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
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.main_700_o,
    fontWeight: '700',
    fontSize: 22,
    color: 'black',
    marginBottom: normalize(12),
    marginTop: normalize(25),
    textAlign: 'center',
  },
});

export default styles;
