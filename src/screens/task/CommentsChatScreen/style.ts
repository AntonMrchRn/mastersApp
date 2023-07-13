import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerChat: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: configApp.ios ? 10 : 0,
  },
});
