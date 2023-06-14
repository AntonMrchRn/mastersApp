import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 12,
  },
  title: {
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  exitBtn: {
    marginHorizontal: 20,
    alignSelf: 'stretch',
    width: 'auto',
    marginTop: 'auto',
    borderWidth: 2,
    borderRadius: 12,
  },
  modalTitle: {
    marginTop: 12,
    textAlign: 'left',
  },
  cancelBtn: {
    borderWidth: 2,
    borderRadius: 12,
  },
});

export default styles;
