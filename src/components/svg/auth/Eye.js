import * as React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

const Eye = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-eye"
    >
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></Path>
      <Circle cx="12" cy="12" r="3"></Circle>
    </Svg>
  );
};

export default Eye;
