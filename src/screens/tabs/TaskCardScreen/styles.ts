import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mt16: {
    marginTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
  body: { marginHorizontal: 20 },
  badges: {
    marginTop: 22,
  },
  title: {
    marginTop: 4,
  },
  price: {
    marginTop: 4,
  },
  tips: {
    marginTop: 8,
  },
  card: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-start',
    paddingVertical: 14,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    marginTop: 30,
    justifyContent: 'space-between',
    shadowColor: 'rgba(2, 52, 227, 0.12)',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  bottom: {
    marginTop: 24,
    marginBottom: 12,
  },
});
