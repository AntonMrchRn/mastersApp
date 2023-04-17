import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import fonts from '../../../components/fonts';
import { configApp } from '../../../utils/helpers/platform';

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
    borderBottomEndRadius: 32,
    borderBottomStartRadius: 32,
  },
  wrapperTopShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.03,
    shadowRadius: 2.2,
    marginBottom: 9,
    elevation: configApp.ios ? 10 : 4,
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
