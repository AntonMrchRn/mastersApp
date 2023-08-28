import React, { FC } from 'react';
import SVG, { LinearGradient, Path, Stop } from 'react-native-svg';
type Scale100IconProps = {
  //
};
export const Scale100Icon: FC<Scale100IconProps> = () => {
  return (
    <SVG width="302" height="16" viewBox="0 0 302 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M298.201 12C300.299 12 302 10.2091 302 8C302 5.79086 300.299 4 298.201 4C296.795 4 295.568 4.8044 294.911 6H13.0256C11.9211 6 11.0256 6.89543 11.0256 8C11.0256 9.10457 11.9211 10 13.0256 10H294.911C295.568 11.1956 296.795 12 298.201 12Z"
        fill="url(#paint0_linear_3345_109750)"
      />
      <Path
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
        fill="#FFC275"
      />
      <Path
        d="M156 8C156 10.2091 154.209 12 152 12C149.791 12 148 10.2091 148 8C148 5.79086 149.791 4 152 4C154.209 4 156 5.79086 156 8Z"
        fill="#FFF8C2"
      />
      <Path
        d="M82 8C82 10.2091 80.2091 12 78 12C75.7909 12 74 10.2091 74 8C74 5.79086 75.7909 4 78 4C80.2091 4 82 5.79086 82 8Z"
        fill="#FFF4CE"
      />
      <Path
        d="M230 8C230 10.2091 228.209 12 226 12C223.791 12 222 10.2091 222 8C222 5.79086 223.791 4 226 4C228.209 4 230 5.79086 230 8Z"
        fill="#EFF9CA"
      />

      <LinearGradient
        id="paint0_linear_3345_109750"
        x1="302"
        y1="8.49976"
        x2="3.0138e-06"
        y2="7.99974"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DDF9D4" />
        <Stop offset="0.495752" stopColor="#FFF8C1" />
        <Stop offset="1" stopColor="#FFF0DC" />
      </LinearGradient>
    </SVG>
  );
};
