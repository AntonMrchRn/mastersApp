import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerChat: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: configApp.ios ? 10 : 0,
  },
  wrapperChat: {
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  risingBlock: {
    paddingHorizontal: 20,
    paddingBottom: configApp.android ? 10 : 0,
    flexDirection: 'row',
  },
  w80: {
    marginRight: -56,
    width: '100%',
    flex: 0,
  },
  w100: {
    width: '100%',
    flex: 0,
  },
  btn: {
    height: 48,
    width: 48,
    marginLeft: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closingText: {
    paddingHorizontal: 20,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
});
