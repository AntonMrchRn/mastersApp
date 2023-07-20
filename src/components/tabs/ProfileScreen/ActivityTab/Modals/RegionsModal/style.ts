import { Platform, StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
  modalTitle: {
    marginTop: 3,
    marginBottom: 24,
    alignSelf: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  btn: {
    height: 48,
    marginTop: 24,
  },
  chips: {
    maxWidth: '90%',
  },
});

export default styles;
