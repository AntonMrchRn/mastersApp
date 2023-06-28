import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperTab: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  shadowWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    justifyContent: 'center',
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
    paddingTop: 25,
  },
  wrapperTop: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#fff',
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
