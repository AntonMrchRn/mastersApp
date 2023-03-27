import * as React from 'react';
import Svg, { Path, Polyline } from 'react-native-svg';

const Profile = prop => {
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
      class="feather feather-home"
    >
      <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></Path>
      <Polyline points="9 22 9 12 15 12 15 22"></Polyline>
    </Svg>
  );
};

export default Profile;
