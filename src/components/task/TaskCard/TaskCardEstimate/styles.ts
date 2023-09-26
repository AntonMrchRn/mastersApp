import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mb8: {
    marginBottom: 8,
  },
  mt16: {
    marginTop: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 20,
    borderRadius: 16,
  },
  candidatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  edit: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  comment: {
    gap: 4,
  },
});
