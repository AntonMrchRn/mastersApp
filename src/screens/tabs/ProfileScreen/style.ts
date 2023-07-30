import { StyleSheet } from 'react-native';

import { configApp } from '@/constants/platform';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    marginLeft: 2,
  },
  banner: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  modalTitle: {
    marginTop: 12,
    marginBottom: 8,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'left',
    marginRight: 10,
  },
  loader: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  toastTitle: {
    fontSize: 17,
  },
  btn: {
    marginBottom: configApp.android ? 30 : 12,
  },
});

export default styles;
