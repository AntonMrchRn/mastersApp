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
  info: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 48,
    flexGrow: 1,
  },
  share: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 12,
    width: 48,
    height: 48,
  },
});

export default styles;
