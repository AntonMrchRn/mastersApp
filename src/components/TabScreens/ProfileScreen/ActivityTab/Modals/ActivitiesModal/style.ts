import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalTitle: {
    marginTop: 12,
    marginBottom: 8,
    alignSelf: 'center',
  },
  btn: {
    height: 48,
    marginBottom: configApp.android ? 30 : 12,
  },
});

export default styles;
