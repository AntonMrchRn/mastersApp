import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const ErrorCross = () => {
  return (
    <Svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="80" height="80" rx="16" fill="#FEEDEE" />
      <Path
        d="M51.25 28.75L28.75 51.25M51.25 51.25L28.75 28.75"
        stroke="#EB142D"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ErrorCross;
