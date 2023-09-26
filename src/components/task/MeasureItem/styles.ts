import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  title: {
    marginVertical: 24,
  },
  button: {
    borderRadius: 12,
  },
  inputs: {
    gap: 16,
  },
  measure: {
    flexDirection: 'row',
    marginTop: 4,
    paddingTop: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  error: {
    marginTop: 4,
  },
});
