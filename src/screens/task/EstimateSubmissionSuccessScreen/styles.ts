import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  body: {
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  title: {
    marginTop: 24,
  },
  description: {
    marginTop: 12,
    textAlign: 'center',
  },
});
