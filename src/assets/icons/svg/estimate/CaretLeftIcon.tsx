import React from 'react';
import SVG, { Path } from 'react-native-svg';

import { IconProps } from '@/assets/icons/svg/types';

export const CaretLeftIcon = ({ fill = '#1B1B1B' }: IconProps) => (
  <SVG width="25" height="24" viewBox="0 0 25 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.0303 3.96967C16.3232 4.26256 16.3232 4.73744 16.0303 5.03033L9.06066 12L16.0303 18.9697C16.3232 19.2626 16.3232 19.7374 16.0303 20.0303C15.7374 20.3232 15.2626 20.3232 14.9697 20.0303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L14.9697 3.96967C15.2626 3.67678 15.7374 3.67678 16.0303 3.96967Z"
      fill={fill}
    />
  </SVG>
);
