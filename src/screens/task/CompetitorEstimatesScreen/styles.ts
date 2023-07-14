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
    marginBottom: 24,
  },
  carousel: {
    flex: 1,
    width: '100%',
    gap: 12,
  },
  item: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  column: { gap: 12 },
  itemRow: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexShrink: 1,
  },
  contentContainerStyle: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#F1F1F1',
  },
});
