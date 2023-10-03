import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mt8: {
    marginTop: 8,
  },
  mt24: {
    marginTop: 24,
  },
  mt36: {
    marginTop: 36,
  },
  download: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    alignItems: 'center',
    marginTop: 64,
  },
  otes: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginTop: 12,
    textAlign: 'center',
  },
  desc: {
    flexShrink: 1,
  },
  banner: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    bottom: 170,
  },
});
