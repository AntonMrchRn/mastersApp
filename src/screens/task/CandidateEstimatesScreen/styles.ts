import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 24,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  dotsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    bottom: 20,
  },
  arrows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  arrow: {
    height: 40,
    width: '48%',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#F1F1F1',
  },
  shadow: {
    shadowColor: 'rgba(2, 52, 227, 0.12)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  arrowBtn: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
