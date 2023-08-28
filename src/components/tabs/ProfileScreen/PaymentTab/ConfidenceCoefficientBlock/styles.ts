import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 36,
    shadowColor: 'rgba(2, 52, 227, 0.2)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  title: { gap: 8, alignItems: 'center', flexDirection: 'row' },
  scale: { marginVertical: 16 },
});
