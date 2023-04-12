import { StyleSheet } from 'react-native';
import fonts from '../../fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
    padding: 3,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  title: {
    fontFamily: fonts.main_400,
    fontWeight: '600',
    fontSize: 22,
  },
});
