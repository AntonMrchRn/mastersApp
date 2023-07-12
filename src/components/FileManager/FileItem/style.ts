import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTitleSize: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    flexGrow: 1,
  },
  titleSize: {
    marginLeft: 8,
    flexShrink: 1,
  },
  size: { marginTop: 4 },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    bottom: 5,
  },
});

export default styles;
