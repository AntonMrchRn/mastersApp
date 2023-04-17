import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const styles = StyleSheet.create({
  wrapperItem: {
    height: normalize(312, 'height'),
    width: normalize(375, 'width'),
    backgroundColor: '#fff',
    borderBottomWidth: 0.8,
    borderBottomColor: '#D5D5D6',
  },
});

export default styles;
