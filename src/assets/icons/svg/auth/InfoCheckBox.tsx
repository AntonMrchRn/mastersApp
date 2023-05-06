import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const InfoCheckBox = () => {
  return (
    <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <Rect width="80" height="80" rx="16" fill="#E3FCE3" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M54.9874 30.0126C55.6709 30.696 55.6709 31.804 54.9874 32.4874L37.4874 49.9874C36.804 50.6709 35.696 50.6709 35.0126 49.9874L26.2626 41.2374C25.5791 40.554 25.5791 39.446 26.2626 38.7626C26.946 38.0791 28.054 38.0791 28.7374 38.7626L36.25 46.2751L52.5126 30.0126C53.196 29.3291 54.304 29.3291 54.9874 30.0126Z"
        fill="#03A803"
      />
    </Svg>
  );
};

export default InfoCheckBox;
