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
    padding: 15,
  },
  text: {
    fontFamily: fonts.main_400,
    color: 'black',
    fontWeight: '400',
  },
});

export default styles;
