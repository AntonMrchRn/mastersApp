import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: configApp.android ? 20 : 0,
  },
  title: {
    marginTop: 24,
    marginBottom: 8,
  },
  button: {
    borderRadius: 12,
    width: '47%',
    paddingHorizontal: 16,
  },
  input: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
