import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 52,
    height: 52,
    backgroundColor: '#ECF2FF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTitleSize: {
    flexDirection: 'row',
  },
  titleSize: {
    marginLeft: 8,
  },
  title: {
    fontFamily: 'Nunito Sans Bold',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
  },
  size: { marginTop: 4 },
  regularText: {
    fontFamily: 'Nunito Sans Regular',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 16,
  },
  progressTextContainer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLine: {
    backgroundColor: '#FFE7F7',
    borderRadius: 8,
    width: '100%',
  },
});
