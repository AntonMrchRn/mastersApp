import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 24,
  },
  button: {
    borderRadius: 12,
    height: 48,
    marginBottom: configApp.android ? 20 : 0,
  },
  inputs: {
    gap: 16,
  },
  measure: {
    flexDirection: 'row',
    marginTop: 4,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  measureItem: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
  },
  cube: {
    marginRight: 8,
  },
});
