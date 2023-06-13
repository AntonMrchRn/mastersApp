import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shadowWrapper: {
    flex: 1,
    shadowColor: 'rgba(2, 52, 227, 0.12)',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  list: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  wrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  wrapperList: {
    paddingHorizontal: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#3F51B5',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 15,
    shadowOpacity: 0.1,
    elevation: 0.3,
  },
  wrapperTop: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  textHeader: {
    fontWeight: '700',
    fontSize: 32,
    fontFamily: fonts.main_700_o,
    paddingBottom: 24,
    color: 'black',
  },
});

export default styles;
