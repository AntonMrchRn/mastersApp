import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mb8: {
    marginBottom: 8,
  },
  mt16: {
    marginTop: 16,
  },
  bottom: {
    gap: 8,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: { marginRight: 12, height: 20, width: 20 },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    padding: 20,
    borderRadius: 16,
  },
  text: {
    textAlign: 'center',
  },
  candidatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
});
