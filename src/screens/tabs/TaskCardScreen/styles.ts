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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginTop: 30,
    justifyContent: 'space-between',
    shadow: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: -3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2.22,
      elevation: 3,
    },
  },
  bottom: {
    marginTop: 24,
    marginBottom: 12,
  },
});
