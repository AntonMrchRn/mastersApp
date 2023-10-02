import { StyleSheet } from 'react-native';

import { configApp, deviceWidth } from '@/constants/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ph20: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 24,
    marginBottom: 8,
  },
  itemTitle: {
    marginTop: 8,
    marginBottom: 4,
    width: '90%',
  },
  char: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  add: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerContainer: {
    position: 'absolute',
    bottom: 70,
    width: deviceWidth - 40,
    alignSelf: 'center',
  },
  btn: {
    marginBottom: configApp.android ? 20 : 0,
    height: 48,
  },
});
