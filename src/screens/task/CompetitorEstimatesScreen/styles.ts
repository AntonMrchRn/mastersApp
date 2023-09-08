import { StyleSheet } from 'react-native';

import { deviceWidth } from '@/constants/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingRight: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    marginTop: 24,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  column: {
    gap: 12,
  },
  itemRow: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexShrink: 1,
  },
  item: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginLeft: 20,
    borderRadius: 20,
    width: deviceWidth - 70,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#F1F1F1',
  },
});
