import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const CheckBoxActive = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Rect width="20" height="20" rx="4" fill="#3F51B5" />
    <Path
      d="M16.875 5.625L8.125 14.375L3.75 10"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default CheckBoxActive;
