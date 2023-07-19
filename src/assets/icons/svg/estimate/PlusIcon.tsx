import React from 'react';
import SVG, { G, Path } from 'react-native-svg';

import { IconProps } from '@/assets/icons/svg/types';

export const PlusIcon = ({ fill, size = 20 }: IconProps) => {
  return (
    <SVG width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G id="icon/plus">
        <G id="Vector">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.5 10C2.5 9.65482 2.77982 9.375 3.125 9.375H16.875C17.2202 9.375 17.5 9.65482 17.5 10C17.5 10.3452 17.2202 10.625 16.875 10.625H3.125C2.77982 10.625 2.5 10.3452 2.5 10Z"
            fill={fill}
          />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 2.5C10.3452 2.5 10.625 2.77982 10.625 3.125V16.875C10.625 17.2202 10.3452 17.5 10 17.5C9.65482 17.5 9.375 17.2202 9.375 16.875V3.125C9.375 2.77982 9.65482 2.5 10 2.5Z"
            fill={fill}
          />
        </G>
      </G>
    </SVG>
  );
};
