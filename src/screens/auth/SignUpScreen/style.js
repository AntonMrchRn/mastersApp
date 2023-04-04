import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  containerKeyBoard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'flex-start',
  },
  wrapperSignIn: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    alignItems: 'center',
  },
});
