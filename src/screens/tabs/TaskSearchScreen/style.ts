import { StyleSheet } from 'react-native';

import fonts from '../../../utils/helpers/getFonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    width: '100%',
    flex: 1,
  },
  wrapperCenter: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
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
  },
  textHeader: {
    fontWeight: '700',
    fontSize: 32,
    fontFamily: fonts.main_700_o,
    paddingBottom: 20,
    color: 'black',
  },
});

export default styles;
