import React, { FC } from 'react';
import SVG, { Path } from 'react-native-svg';

export const DownloadFilesIcon: FC<{ color?: string }> = ({
  color = '#D5D5D6',
}) => {
  return (
    <SVG width="48" height="48" viewBox="0 0 48 48" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.37868 11.3787C8.94129 10.8161 9.70435 10.5 10.5 10.5H25.5C25.8978 10.5 26.2794 10.658 26.5607 10.9393L34.0607 18.4393C34.342 18.7206 34.5 19.1022 34.5 19.5V40.5C34.5 41.2956 34.1839 42.0587 33.6213 42.6213C33.0587 43.1839 32.2956 43.5 31.5 43.5H10.5C9.70435 43.5 8.94129 43.1839 8.37868 42.6213C7.81607 42.0587 7.5 41.2956 7.5 40.5V13.5C7.5 12.7043 7.81607 11.9413 8.37868 11.3787ZM24.8787 13.5H10.5L10.5 40.5H31.5V20.1213L24.8787 13.5Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.3787 5.37868C14.9413 4.81607 15.7043 4.5 16.5 4.5H31.5C31.8978 4.5 32.2794 4.65804 32.5607 4.93934L40.0607 12.4393C40.342 12.7206 40.5 13.1022 40.5 13.5V34.5C40.5 35.2956 40.1839 36.0587 39.6213 36.6213C39.0587 37.1839 38.2956 37.5 37.5 37.5H33C32.1716 37.5 31.5 36.8284 31.5 36C31.5 35.1716 32.1716 34.5 33 34.5H37.5V14.1213L30.8787 7.5L16.5 7.5V12C16.5 12.8284 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8284 13.5 12V7.5C13.5 6.70435 13.8161 5.94129 14.3787 5.37868Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 28.5C15 27.6716 15.6716 27 16.5 27H25.5C26.3284 27 27 27.6716 27 28.5C27 29.3284 26.3284 30 25.5 30H16.5C15.6716 30 15 29.3284 15 28.5Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 34.5C15 33.6716 15.6716 33 16.5 33H25.5C26.3284 33 27 33.6716 27 34.5C27 35.3284 26.3284 36 25.5 36H16.5C15.6716 36 15 35.3284 15 34.5Z"
        fill={color}
      />
    </SVG>
  );
};
