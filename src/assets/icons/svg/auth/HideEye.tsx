import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const HideEye = () => (
  <View style={styles.container}>
    <Svg width="23" height="26" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.5 3.75L19.5 20.25"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.522 14.7746C13.8338 15.405 12.9334 15.7532 12.0001 15.7496C11.2432 15.7495 10.5041 15.5204 9.87984 15.0924C9.25561 14.6644 8.77551 14.0575 8.50265 13.3515C8.22979 12.6455 8.17695 11.8735 8.35107 11.1369C8.52519 10.4003 8.91812 9.73369 9.47821 9.22461"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.9375 6.43164C3.1125 8.36289 1.5 12.0004 1.5 12.0004C1.5 12.0004 4.5 18.7504 12 18.7504C13.7574 18.7647 15.4929 18.3598 17.0625 17.5691"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.7031 8.31543C13.5006 8.46653 14.2273 8.87293 14.7735 9.47329C15.3198 10.0736 15.6559 10.8354 15.7313 11.6436"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  </View>
);

export default HideEye;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 2,
  },
});
