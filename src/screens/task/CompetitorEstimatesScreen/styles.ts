import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  carousel: {
    marginTop: 24,
    flex: 1,
    width: '100%',
    gap: 12,
  },
  item: {
    borderWidth: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    marginLeft: 20,
    borderRadius: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    gap: 8,
  },
  itemRow: {
    gap: 4,
    flexDirection: 'row',
  },
  name: {
    flexShrink: 1,
  },
});
