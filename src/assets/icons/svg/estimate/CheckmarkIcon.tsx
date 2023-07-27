import React from 'react';
import SVG, { G, Path } from 'react-native-svg';

export const CheckmarkIcon = () => {
  return (
    <SVG width="40" height="40" viewBox="0 0 40 40" fill="none">
      <G id="icon/checkmark">
        <Path
          id="Vector"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M34.6339 10.3661C35.122 10.8543 35.122 11.6457 34.6339 12.1339L17.1339 29.6339C16.6457 30.122 15.8543 30.122 15.3661 29.6339L6.61612 20.8839C6.12796 20.3957 6.12796 19.6043 6.61612 19.1161C7.10427 18.628 7.89573 18.628 8.38388 19.1161L16.25 26.9822L32.8661 10.3661C33.3543 9.87796 34.1457 9.87796 34.6339 10.3661Z"
          fill="#03A803"
        />
      </G>
    </SVG>
  );
};
