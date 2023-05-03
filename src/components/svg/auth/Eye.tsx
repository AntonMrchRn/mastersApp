import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const Eye = () => {
  return (
    <View style={styles.container}>
      <Svg
        width="31"
        height="30"
        viewBox="0 0 32 28"
        fill="none"
        // @ts-expect-error TS(2322): Type '{ children: Element; width: string; height: ... Remove this comment to see the full error message
        xmlns="http://www.w3.org/2000/svg"
      >
        <G filter="url(#filter0_d_36_6208)">
          <Path
            d="M16 5.25C8.5 5.25 5.5 12 5.5 12C5.5 12 8.5 18.75 16 18.75C23.5 18.75 26.5 12 26.5 12C26.5 12 23.5 5.25 16 5.25Z"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M16 15.75C18.0711 15.75 19.75 14.0711 19.75 12C19.75 9.92893 18.0711 8.25 16 8.25C13.9289 8.25 12.25 9.92893 12.25 12C12.25 14.0711 13.9289 15.75 16 15.75Z"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
      </Svg>
    </View>
  );
};

export default Eye;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 2,
  },
});
