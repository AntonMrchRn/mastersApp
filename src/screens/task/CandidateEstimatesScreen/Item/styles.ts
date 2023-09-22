import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  column: {
    gap: 12,
  },
  itemRow: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  name: {
    flexShrink: 1,
  },
});
