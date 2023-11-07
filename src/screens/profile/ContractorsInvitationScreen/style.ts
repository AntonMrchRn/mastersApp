import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

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
    height: normalize(120, 'height'),
  },
  wrapIcon: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastTitle: {
    fontSize: 17,
  },
  info: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 35,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 25,
  },
  txt: {
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 24,
    minHeight: 48,
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
