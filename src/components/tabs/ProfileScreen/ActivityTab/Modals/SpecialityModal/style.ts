import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
  btn: {
    height: 48,
    marginBottom: configApp.android ? 30 : 12,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalTitle: {
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    marginBottom: 20,
  },
  input: {
    paddingRight: 8,
  },
});

export default styles;
