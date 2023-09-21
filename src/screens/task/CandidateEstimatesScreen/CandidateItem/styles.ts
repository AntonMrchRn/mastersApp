import { StyleSheet } from 'react-native';

import { deviceWidth } from '@/constants/platform';

export const styles = StyleSheet.create({
  candidate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  winner: {
    gap: 2,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  item: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 20,
    width: deviceWidth - 40,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#F1F1F1',
    marginHorizontal: 10,
    marginVertical: 10,
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
});
