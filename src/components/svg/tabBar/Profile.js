import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Profile = prop => {
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.5 15C15.8137 15 18.5 12.3137 18.5 9C18.5 5.68629 15.8137 3 12.5 3C9.18629 3 6.5 5.68629 6.5 9C6.5 12.3137 9.18629 15 12.5 15Z"
        stroke={prop.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.40625 20.2499C4.32775 18.6534 5.65328 17.3277 7.24958 16.406C8.84588 15.4843 10.6567 14.999 12.5 14.999C14.3433 14.999 16.1541 15.4843 17.7504 16.406C19.3467 17.3277 20.6722 18.6534 21.5938 20.2499"
        stroke={prop.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Profile;
