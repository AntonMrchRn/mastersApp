import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapTop: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 20,
    alignItems: 'flex-end',
    minHeight: '7%',
  },
  btnTxt: {
    fontWeight: '700',
    fontFamily: 'Nunito Sans',
    fontSize: 15,
    lineHeight: 20,
  },
  wrapIcon: {
    width: '100%',
    flex: 1,
    marginBottom: 12,
  },
  wrapBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  suffix: {
    fontSize: 12,
    fontFamily: 'Nunito Sans',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Nunito Sans',
  },
  wrapCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapBtn: {
    borderRadius: 12,
    borderWidth: 1.5,
    width: 120,
    borderColor: '#FFFFFF',
  },
  wrapBtnLast: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
  },
  labelBtnLast: {
    color: '#3F51B5',
  },
  btn: {
    paddingHorizontal: 12,
  },
  labelBtn: {
    textAlign: 'center',
  },
});
