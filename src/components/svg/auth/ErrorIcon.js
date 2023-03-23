import * as React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

const ErrorIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-x-circle"
    >
      <Circle cx="12" cy="12" r="10"></Circle>
      <Line x1="15" y1="9" x2="9" y2="15"></Line>
      <Line x1="9" y1="9" x2="15" y2="15"></Line>
    </Svg>
  );
};

export default ErrorIcon;
