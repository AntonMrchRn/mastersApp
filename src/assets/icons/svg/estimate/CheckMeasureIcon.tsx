import React from 'react';
import SVG, { G, Path } from 'react-native-svg';

import { IconProps } from '@/assets/icons/svg/types';

export const CheckMeasureIcon = ({
  fill = '#3F51B5',
  size = 24,
}: IconProps) => {
  return (
    <SVG width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G id="icon/checkmark">
        <Path
          id="Vector"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.7803 6.21967C21.0732 6.51256 21.0732 6.98744 20.7803 7.28033L10.2803 17.7803C9.98744 18.0732 9.51256 18.0732 9.21967 17.7803L3.96967 12.5303C3.67678 12.2374 3.67678 11.7626 3.96967 11.4697C4.26256 11.1768 4.73744 11.1768 5.03033 11.4697L9.75 16.1893L19.7197 6.21967C20.0126 5.92678 20.4874 5.92678 20.7803 6.21967Z"
          fill={fill}
        />
      </G>
    </SVG>
  );
};
