import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    minHeight: 45,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  wrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    maxWidth: '70%',
    flex: 1,
  },
  titleTxt: {
    textAlign: 'center',
  },
  descriptionTxt: {
    textAlign: 'center',
  },
  btnBack: {
    width: 45,
    paddingVertical: 5,
  },
  fix: {
    width: '15%',
    height: '100%',
  },
  background: {
    backgroundColor: '#fff',
  },
});

export default styles;
