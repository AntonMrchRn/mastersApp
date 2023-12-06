import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalTitle: {
    marginTop: 12,
    marginBottom: 8,
    width: '80%',
    alignSelf: 'center',
  },
  entityType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  entityTypeText: {
    flexShrink: 1,
  },
  payerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  input: {
    paddingRight: 8,
  },
  btn: {
    height: 48,
  },
  pb10: {
    paddingBottom: 10,
  },
});

export default styles;
