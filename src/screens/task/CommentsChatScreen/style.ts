import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

export const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  containerChat: {
    zIndex: 10,
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: configApp.ios ? 10 : 0,
  },
});
