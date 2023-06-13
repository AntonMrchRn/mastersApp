import React, { FC } from 'react';
import SVG, { Path } from 'react-native-svg';

export const FileIcon: FC<{ color?: string }> = ({ color = 'black' }) => {
  return (
    <SVG width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.18934 2.68934C4.47064 2.40804 4.85218 2.25 5.25 2.25H14.25C14.4489 2.25 14.6397 2.32902 14.7803 2.46967L20.0303 7.71967C20.171 7.86032 20.25 8.05109 20.25 8.25V20.25C20.25 20.6477 20.092 21.0294 19.8104 21.3108C19.5291 21.5922 19.1475 21.75 18.75 21.75H5.25C4.8523 21.75 4.47078 21.5921 4.18943 21.3107C4.18937 21.3107 4.1895 21.3108 4.18943 21.3107M4.18943 21.3107C3.90812 21.0294 3.75 20.6477 3.75 20.25V3.75C3.75 3.35218 3.90804 2.97064 4.18934 2.68934M13.9393 3.75L5.25 3.75L5.25 20.25L18.7499 20.25L18.75 8.56066L13.9393 3.75Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.25 2.25C14.6642 2.25 15 2.58579 15 3V7.5H19.5C19.9142 7.5 20.25 7.83579 20.25 8.25C20.25 8.66421 19.9142 9 19.5 9H14.25C13.8358 9 13.5 8.66421 13.5 8.25V3C13.5 2.58579 13.8358 2.25 14.25 2.25Z"
        fill={color}
      />
    </SVG>
  );
};