import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapperLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    paddingTop: 32,
  },
  containerList: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    bottom: -20,
  },
  notAvailableContainerList: {
    bottom: 0,
    paddingTop: 0,
  },
});
