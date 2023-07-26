import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  empty: {
    flex: 0.25,
  },
  toastTitle: {
    fontSize: 17,
  },
  toastContainer: {
    height: 105,
  },
  btn: {
    height: 48,
  },
  info: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 12,
  },
});

export default styles;
