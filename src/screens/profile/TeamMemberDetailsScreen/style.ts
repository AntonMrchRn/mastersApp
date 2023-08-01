import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    flexShrink: 1,
  },
  deleteBtn: {
    borderWidth: 0,
  },
  input: {
    paddingRight: 8,
  },
});

export default styles;
