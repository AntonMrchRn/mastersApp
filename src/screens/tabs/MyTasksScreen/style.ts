import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperTab: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  shadowWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    justifyContent: 'center',
  },
  list: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  emptyListContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  wrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 25,
  },
  wrapperTop: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingBottom: 5,
  },
  textHeader: {
    paddingBottom: 24,
  },
});

export default styles;
