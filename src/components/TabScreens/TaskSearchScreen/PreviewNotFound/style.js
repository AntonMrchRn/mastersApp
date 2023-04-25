import { StyleSheet } from 'react-native';
import fonts from '../../../fonts';

const styles = StyleSheet.create({
  wrapperNotFound: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontFamily: fonts.main_700_o,
    fontWeight: '700',
    fontSize: 23,
    color: 'black',
    paddingTop: 30,
    paddingBottom: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: fonts.main_400,
    color: '#707070',
    textAlign: 'center',
  },
});

export default styles;