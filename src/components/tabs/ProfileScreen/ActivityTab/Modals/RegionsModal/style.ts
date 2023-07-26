import { Platform, StyleSheet } from 'react-native';

import { configApp, deviceWidth } from '@/constants/platform';

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
  chipsLabel: {
    maxWidth: deviceWidth * 0.78,
  },
});

export default styles;
