import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';
import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#EBF0F9',
    borderRadius: 7,
  },
  txt: {
    color: '#1B1B1B',
    fontFamily: fonts.main_400,
  },
});

export default styles;
