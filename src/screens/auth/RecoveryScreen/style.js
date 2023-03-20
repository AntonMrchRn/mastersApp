import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperSignIn: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClose: {
    width: '90%',
    height: '80%',
    backgroundColor: '#3f51b5',
    justifyContent: 'center',
    borderRadius: 12,
  },
  titleInfo: {
    textAlign: 'center',
    height: 100,
    paddingHorizontal: 5,
    color: 'black',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  containerBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    textAlign: 'center',
    color: 'white',
  },
});
