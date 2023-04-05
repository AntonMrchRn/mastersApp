import { Platform, StyleSheet } from 'react-native';
import fonts from '../fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffefe6',
    width: '100%',
    paddingRight: 5,
    paddingVertical: 7,
    paddingLeft: 7,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  text: {
    color: '#636363',
    fontSize: Platform.OS === 'ios' ? 13 : 11,
    paddingRight: 10,
    width: '90%',
    fontFamily: fonts.main_400,
    fontWeight: '400',
  },
});
