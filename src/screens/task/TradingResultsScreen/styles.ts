import { StyleSheet } from 'react-native';

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
  candidat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  winner: {
    gap: 2,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
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
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#F1F1F1',
  },
});
