import { StyleSheet } from 'react-native';

import { deviceWidth } from '@/constants/platform';

export const styles = StyleSheet.create({
  bottom: {
    gap: 8,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  estimate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  estimateSum: {
    gap: 4,
  },
  crossed: {
    textDecorationLine: 'line-through',
  },
  tooltip: {
    width: deviceWidth * 0.75,
  },
});
