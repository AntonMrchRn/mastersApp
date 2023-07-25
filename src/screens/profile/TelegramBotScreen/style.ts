import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  tgIcon: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  successIcon: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  empty: {
    flex: 0.25,
  },
  text: {
    textAlign: 'center',
  },
  btn: {
    height: 48,
    borderRadius: 12,
  },
  successConnection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
