import React, { FC } from 'react';
import SVG, { LinearGradient, Path, Stop } from 'react-native-svg';
type Scale105IconProps = {
  //
};
export const Scale105Icon: FC<Scale105IconProps> = () => {
  return (
    <SVG width="100%" height="16" viewBox="0 0 302 16" fill="none">
      <Path
        d="M4 8C4 6.89543 4.30873 6 4.68956 6H79.3104C79.6913 6 80 6.89543 80 8C80 9.10457 79.6913 10 79.3104 10H4.68956C4.30873 10 4 9.10457 4 8Z"
        fill="url(#paint0_linear_3345_109766)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M298.176 12C300.274 12 301.974 10.2091 301.974 8C301.974 5.79086 300.274 4 298.176 4C296.77 4 295.542 4.8044 294.885 6H83C81.8954 6 81 6.89543 81 8C81 9.10457 81.8954 10 83 10H294.885C295.542 11.1956 296.77 12 298.176 12Z"
        fill="url(#paint1_linear_3345_109766)"
      />
      <Path
        d="M86 8C86 12.4183 82.4183 16 78 16C73.5817 16 70 12.4183 70 8C70 3.58172 73.5817 0 78 0C82.4183 0 86 3.58172 86 8Z"
        fill="#FFD43C"
      />
      <Path
        d="M8 8C8 10.2091 6.20914 12 4 12C1.79086 12 0 10.2091 0 8C0 5.79086 1.79086 4 4 4C6.20914 4 8 5.79086 8 8Z"
        fill="#FFC275"
      />
      <Path
        d="M155 8C155 10.2091 153.209 12 151 12C148.791 12 147 10.2091 147 8C147 5.79086 148.791 4 151 4C153.209 4 155 5.79086 155 8Z"
        fill="#FEF8C2"
      />
      <Path
        d="M230 8C230 10.2091 228.209 12 226 12C223.791 12 222 10.2091 222 8C222 5.79086 223.791 4 226 4C228.209 4 230 5.79086 230 8Z"
        fill="#EFF9CA"
      />
      <LinearGradient
        id="paint0_linear_3345_109766"
        x1="302"
        y1="8.00664"
        x2="4.00007"
        y2="8.02415"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#75ED74" />
        <Stop offset="0.504093" stopColor="#FEE600" />
        <Stop offset="1" stopColor="#FFC178" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_3345_109766"
        x1="301.974"
        y1="7.99993"
        x2="-0.025633"
        y2="7.49998"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DDF9D3" />
        <Stop offset="0.499788" stopColor="#FFF8C1" />
        <Stop offset="1" stopColor="#FFF0DC" />
      </LinearGradient>
    </SVG>
  );
};
