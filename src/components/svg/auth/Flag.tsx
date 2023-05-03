import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Flag = () => {
  return (
    <Svg width="24" height="22" viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_9_6938)">
        <Path
          d="M11.9627 0.75C7.08769 0.75 2.9252 3.9 1.3877 8.25H22.6127C21.0377 3.9 16.8752 0.75 11.9627 0.75Z"
          fill="white"
        />
        <Path
          d="M11.9627 23.25C16.8752 23.25 21.0377 20.1 22.5752 15.75H1.3877C2.9252 20.1375 7.0877 23.25 11.9627 23.25Z"
          fill="#ED4C5C"
        />
        <Path
          d="M1.3875 8.25C0.975 9.4125 0.75 10.6875 0.75 12C0.75 13.3125 0.975 14.5875 1.3875 15.75H22.6125C23.025 14.5875 23.25 13.3125 23.25 12C23.25 10.6875 23.025 9.4125 22.6125 8.25H1.3875Z"
          fill="#428BC1"
        />
      </G>
    </Svg>
  );
};

export default Flag;
