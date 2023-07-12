import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  mt24: {
    marginTop: 24,
  },
  container: {
    marginTop: 24,
    paddingBottom: configApp.android ? 20 : 0,
  },
  action: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  line: {
    width: '100%',
    height: 1,
  },
});

export default styles;
