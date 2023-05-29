import { Platform, StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperSignIn: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    width: '100%',
    justifyContent: 'flex-start',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '400',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
  },
  containerError: {
    width: '100%',
    height: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default styles;
