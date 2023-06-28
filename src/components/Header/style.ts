import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';

const styles = StyleSheet.create({
  container: {
    height: 45,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  wrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  btnBack: {
    width: 45,
    paddingVertical: 5,
  },
  lateralWrapper: {
    width: '15%',
    justifyContent: 'center',
  },
  fix: {
    width: '15%',
    height: '100%',
  },
});

export default styles;
