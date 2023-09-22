import React from 'react';
import SVG, { G, Path } from 'react-native-svg';

import { IconProps } from '@/assets/icons/svg/types';

export const CaretRightIcon = ({ fill = '#1B1B1B' }: IconProps) => (
  <SVG width="24" height="24" viewBox="0 0 24 24" fill="none">
    <G id="icon/caret_right">
      <Path
        id="Vector"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.46967 3.96967C8.76256 3.67678 9.23744 3.67678 9.53033 3.96967L17.0303 11.4697C17.3232 11.7626 17.3232 12.2374 17.0303 12.5303L9.53033 20.0303C9.23744 20.3232 8.76256 20.3232 8.46967 20.0303C8.17678 19.7374 8.17678 19.2626 8.46967 18.9697L15.4393 12L8.46967 5.03033C8.17678 4.73744 8.17678 4.26256 8.46967 3.96967Z"
        fill={fill}
      />
    </G>
  </SVG>
);
