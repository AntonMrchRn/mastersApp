import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ph20: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 24,
    marginBottom: 8,
  },
  itemTitle: {
    marginTop: 8,
    marginBottom: 4,
    width: '90%',
  },
  char: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 4,
  },
  add: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  trash: { position: 'absolute', top: 20, right: 0 },
});
