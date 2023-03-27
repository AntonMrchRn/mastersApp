import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const Employees = prop => {
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
      class="feather feather-users"
    >
      <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></Path>
      <Circle cx="9" cy="7" r="4"></Circle>
      <Path d="M23 21v-2a4 4 0 0 0-3-3.87"></Path>
      <Path d="M16 3.13a4 4 0 0 1 0 7.75"></Path>
    </Svg>
  );
};

export default Employees;
