import { StyleSheet } from 'react-native';

import { deviceWidth } from '@/constants/platform';

const styles = StyleSheet.create({
  modalTitle: {
    marginTop: 3,
    marginBottom: 24,
    alignSelf: 'center',
  },
  chipsContainer: {
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  btn: {
    height: 48,
    marginTop: 24,
  },
  chipsLabel: {
    maxWidth: deviceWidth * 0.78,
  },
  ph0: {
    paddingHorizontal: 0,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  pr20: {
    paddingRight: 20,
  },
});

export default styles;
