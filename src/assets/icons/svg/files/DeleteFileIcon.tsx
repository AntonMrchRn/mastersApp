import React from 'react';
import SVG, { Path } from 'react-native-svg';

import { IconProps } from '@/assets/icons/svg/types';

export const DeleteFileIcon = ({ fill = '#1B1B1B' }: IconProps) => {
  return (
    <SVG width="18" height="20" viewBox="0 0 18 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.15901 0.65901C5.58096 0.237058 6.15327 0 6.75 0H11.25C11.8467 0 12.4191 0.237039 12.841 0.65901C13.263 1.081 13.5 1.65332 13.5 2.25V3H15.7424C15.7469 2.99996 15.7515 2.99996 15.7561 3H17.25C17.6642 3 18 3.33579 18 3.75C18 4.16421 17.6642 4.5 17.25 4.5H16.4499C16.2399 7.56498 15.735 15.2111 15.5596 17.8709C15.4987 18.7933 14.7361 19.5 13.8168 19.5H4.18266C3.26292 19.5 2.50123 18.7928 2.44044 17.8709C2.26505 15.2112 1.76015 7.56524 1.5501 4.5H0.75C0.335786 4.5 0 4.16421 0 3.75C0 3.33579 0.335786 3 0.75 3H2.2439C2.24849 2.99996 2.25306 2.99996 2.25763 3H4.5V2.25C4.5 1.65327 4.73706 1.08096 5.15901 0.65901ZM3.05361 4.5C3.26799 7.63442 3.76389 15.1441 3.93719 17.7722C3.94572 17.9016 4.04884 18 4.18266 18H13.8168C13.9511 18 14.0543 17.9011 14.0628 17.7722C14.2361 15.1441 14.732 7.63417 14.9464 4.5H3.05361ZM12 3H6V2.25C6 2.05109 6.07902 1.86032 6.21967 1.71967C6.36032 1.57902 6.55109 1.5 6.75 1.5H11.25C11.4489 1.5 11.6397 1.57904 11.7804 1.71967C11.921 1.86028 12 2.05104 12 2.25V3ZM6.75 7.5C7.16421 7.5 7.5 7.83579 7.5 8.25V14.25C7.5 14.6642 7.16421 15 6.75 15C6.33579 15 6 14.6642 6 14.25V8.25C6 7.83579 6.33579 7.5 6.75 7.5ZM11.25 7.5C11.6642 7.5 12 7.83579 12 8.25V14.25C12 14.6642 11.6642 15 11.25 15C10.8358 15 10.5 14.6642 10.5 14.25V8.25C10.5 7.83579 10.8358 7.5 11.25 7.5Z"
        fill={fill}
      />
    </SVG>
  );
};
