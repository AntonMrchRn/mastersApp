import React from 'react';
import SVG, { Path } from 'react-native-svg';

import { IconProps } from '@/assets/icons/svg/types';

export const CloseIcon = ({ fill = '#1B1B1B', size = 24 }: IconProps) => {
  return (
    <SVG width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.71967 4.71967C5.01256 4.42678 5.48744 4.42678 5.78033 4.71967L12 10.9393L18.2197 4.71967C18.5126 4.42678 18.9874 4.42678 19.2803 4.71967C19.5732 5.01256 19.5732 5.48744 19.2803 5.78033L13.0607 12L19.2803 18.2197C19.5732 18.5126 19.5732 18.9874 19.2803 19.2803C18.9874 19.5732 18.5126 19.5732 18.2197 19.2803L12 13.0607L5.78033 19.2803C5.48744 19.5732 5.01256 19.5732 4.71967 19.2803C4.42678 18.9874 4.42678 18.5126 4.71967 18.2197L10.9393 12L4.71967 5.78033C4.42678 5.48744 4.42678 5.01256 4.71967 4.71967Z"
        fill={fill}
      />
    </SVG>
  );
};

export default CloseIcon;
