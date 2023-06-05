import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  body: { marginHorizontal: 20 },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 22,
  },
  badge: {
    marginRight: 4,
    marginVertical: 4,
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
  },
});
