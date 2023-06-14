import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';

const styles = StyleSheet.create({
  container: {
    height: 45,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  btnBack: {
    width: 45,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lateralWrapper: {
    width: '15%',
    justifyContent: 'center',
  },
  fix: {
    width: '15%',
    height: '100%',
  },
  label: {
    fontSize: 15,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
});

export default styles;