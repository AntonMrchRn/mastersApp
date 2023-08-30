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
    flexWrap: 'wrap',
  },
  add: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  head: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
