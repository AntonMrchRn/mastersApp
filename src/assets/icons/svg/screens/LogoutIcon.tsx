import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/assets/icons/svg/types';

const LogoutIcon = ({ fill }: IconProps) => (
  <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
    <Path
      d="M5 3C4.60217 3 4.22064 3.15804 3.93934 3.43934C3.65804 3.72064 3.5 4.10217 3.5 4.5V19.5C3.5 19.8978 3.65804 20.2794 3.93934 20.5607C4.22065 20.842 4.60218 21 5 21H10.25C10.6642 21 11 20.6642 11 20.25C11 19.8358 10.6642 19.5 10.25 19.5H5L5 4.5L10.25 4.5C10.6642 4.5 11 4.16421 11 3.75C11 3.33579 10.6642 3 10.25 3H5Z"
      fill={fill}
    />
    <Path
      d="M16.2822 7.53217C16.5751 7.23928 17.0499 7.23928 17.3428 7.53217L21.2803 11.4697C21.3522 11.5416 21.4065 11.6245 21.4431 11.7129C21.4798 11.8013 21.5 11.8983 21.5 12C21.5 12.1919 21.4268 12.3839 21.2803 12.5303L17.3428 16.4678C17.0499 16.7607 16.5751 16.7607 16.2822 16.4678C15.9893 16.1749 15.9893 15.7001 16.2822 15.4072L18.9393 12.75H10.25C9.83579 12.75 9.5 12.4142 9.5 12C9.5 11.5858 9.83579 11.25 10.25 11.25H18.9393L16.2822 8.59283C15.9893 8.29994 15.9893 7.82506 16.2822 7.53217Z"
      fill={fill}
    />
  </Svg>
);

export default LogoutIcon;