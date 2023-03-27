import { StyleSheet } from 'react-native';
import fonts from '../../../components/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: fonts.main_400,
    color: 'black',
    fontWeight: '400',
  },
});

export default styles;
