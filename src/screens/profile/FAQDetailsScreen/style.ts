import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { paddingHorizontal: 20 },
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: 'rgba(2, 52, 227, 0.12)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  text: {
    flexShrink: 1,
  },
  subsectionsWrapper: {
    marginVertical: 5,
  },
});
