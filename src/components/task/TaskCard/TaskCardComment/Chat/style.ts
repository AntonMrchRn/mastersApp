import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  containerHuman: {
    alignItems: 'flex-start',
  },
  humanInfo: {
    marginLeft: 5,
    marginBottom: 3,
    maxWidth: '75%',
  },
  wrapperMessageMy: {
    maxWidth: '90%',
    marginLeft: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 5,
    borderRadius: 10,
    borderTopRightRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperMessageHuman: {
    maxWidth: '90%',
    marginLeft: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 5,
    borderRadius: 10,
    borderTopLeftRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeMy: {
    marginRight: 5,
    marginTop: 4,
    marginBottom: 16,
  },
  timeHuman: {
    marginLeft: 5,
    marginTop: 4,
    marginBottom: 16,
  },
});

export default styles;
