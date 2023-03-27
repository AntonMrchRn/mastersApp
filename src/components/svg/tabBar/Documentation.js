import * as React from 'react';
import Svg, { Path, Polyline } from 'react-native-svg';

const Documentation = prop => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={prop.color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-file"
    >
      <Path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></Path>
      <Polyline points="13 2 13 9 20 9"></Polyline>
    </Svg>
  );
};

export default Documentation;
