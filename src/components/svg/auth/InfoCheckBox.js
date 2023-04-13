import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const InfoCheckBox = () => {
  return (
    <Svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="80" height="80" rx="16" fill="#E3FCE3" />
      <Path
        d="M53.75 31.25L36.25 48.75L27.5 40"
        stroke="#03A803"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default InfoCheckBox;
