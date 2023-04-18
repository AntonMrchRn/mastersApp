import { StyleSheet } from 'react-native';
import fonts from '../../../components/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
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
