import { StyleSheet } from 'react-native';

import { deviceWidth } from '@/constants/platform';

export const styles = StyleSheet.create({
  mt16: {
    marginTop: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  contentContainerTab: {
    paddingHorizontal: 20,
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
    paddingBottom: 14,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    marginTop: 30,
    justifyContent: 'space-between',
  },
  bottom: {
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
  },
  estimateBottom: {
    gap: 16,
    marginHorizontal: 20,
    width: deviceWidth - 40,
    backgroundColor: 'white',
  },
  segment: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  loader: {
    flex: 1,
  },
});
