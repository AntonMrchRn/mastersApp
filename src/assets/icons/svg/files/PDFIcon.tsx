import React, { FC } from 'react';
import SVG, { Path } from 'react-native-svg';

export const PDFIcon: FC<{ color?: string }> = ({ color = 'black' }) => {
  return (
    <SVG width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.18934 2.68934C4.47064 2.40804 4.85217 2.25 5.25 2.25H14.25C14.4489 2.25 14.6397 2.32902 14.7803 2.46967L20.0303 7.71967C20.171 7.86032 20.25 8.05109 20.25 8.25V12C20.25 12.4142 19.9142 12.75 19.5 12.75C19.0858 12.75 18.75 12.4142 18.75 12V8.56066L13.9393 3.75L5.25 3.75L5.25 12C5.25 12.4142 4.91421 12.75 4.5 12.75C4.08579 12.75 3.75 12.4142 3.75 12V3.75C3.75 3.35217 3.90804 2.97064 4.18934 2.68934Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.25 2.25C14.6642 2.25 15 2.58579 15 3V7.5H19.5C19.9142 7.5 20.25 7.83579 20.25 8.25C20.25 8.66421 19.9142 9 19.5 9H14.25C13.8358 9 13.5 8.66421 13.5 8.25V3C13.5 2.58579 13.8358 2.25 14.25 2.25Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.75 15.75C3.75 15.3358 4.08579 15 4.5 15H6C6.59674 15 7.16903 15.2371 7.59099 15.659C8.01295 16.081 8.25 16.6533 8.25 17.25C8.25 17.8467 8.01295 18.419 7.59099 18.841C7.16903 19.2629 6.59674 19.5 6 19.5H5.25V20.25C5.25 20.6642 4.91421 21 4.5 21C4.08579 21 3.75 20.6642 3.75 20.25V15.75ZM5.25 18H6C6.19891 18 6.38968 17.921 6.53033 17.7803C6.67098 17.6397 6.75 17.4489 6.75 17.25C6.75 17.0511 6.67098 16.8603 6.53033 16.7197C6.38968 16.579 6.19891 16.5 6 16.5H5.25V18Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.875 15.75C16.875 15.3358 17.2108 15 17.625 15H20.25C20.6642 15 21 15.3358 21 15.75C21 16.1642 20.6642 16.5 20.25 16.5H18.375V20.25C18.375 20.6642 18.0392 21 17.625 21C17.2108 21 16.875 20.6642 16.875 20.25V15.75Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.875 18.375C16.875 17.9608 17.2108 17.625 17.625 17.625H19.875C20.2892 17.625 20.625 17.9608 20.625 18.375C20.625 18.7892 20.2892 19.125 19.875 19.125H17.625C17.2108 19.125 16.875 18.7892 16.875 18.375Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.9375 15.75C9.9375 15.3358 10.2733 15 10.6875 15H12C12.7956 15 13.5587 15.3161 14.1213 15.8787C14.6839 16.4413 15 17.2044 15 18C15 18.7956 14.6839 19.5587 14.1213 20.1213C13.5587 20.6839 12.7956 21 12 21H10.6875C10.2733 21 9.9375 20.6642 9.9375 20.25V15.75ZM11.4375 16.5V19.5H12C12.3978 19.5 12.7794 19.342 13.0607 19.0607C13.342 18.7794 13.5 18.3978 13.5 18C13.5 17.6022 13.342 17.2206 13.0607 16.9393C12.7794 16.658 12.3978 16.5 12 16.5H11.4375Z"
        fill={color}
      />
    </SVG>
  );
};
