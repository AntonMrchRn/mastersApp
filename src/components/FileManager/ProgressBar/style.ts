import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  progressTextContainer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLine: {
    borderRadius: 8,
    width: '100%',
    height: 4,
  },
  progressFill: {
    borderRadius: 8,
    height: 4,
  },
});

export default styles;
