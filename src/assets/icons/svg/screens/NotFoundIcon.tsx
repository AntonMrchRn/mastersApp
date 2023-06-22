import React, { FC } from 'react';
import SVG, { Path, Rect } from 'react-native-svg';

export const NotFoundIcon: FC = () => {
  return (
    <SVG width="80" height="80" viewBox="0 0 80 80" fill="none">
      <Rect width="80" height="80" rx="16" fill="#FEEDEE" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.8661 27.8661C28.3543 27.378 29.1457 27.378 29.6339 27.8661L40 38.2322L50.3661 27.8661C50.8543 27.378 51.6457 27.378 52.1339 27.8661C52.622 28.3543 52.622 29.1457 52.1339 29.6339L41.7678 40L52.1339 50.3661C52.622 50.8543 52.622 51.6457 52.1339 52.1339C51.6457 52.622 50.8543 52.622 50.3661 52.1339L40 41.7678L29.6339 52.1339C29.1457 52.622 28.3543 52.622 27.8661 52.1339C27.378 51.6457 27.378 50.8543 27.8661 50.3661L38.2322 40L27.8661 29.6339C27.378 29.1457 27.378 28.3543 27.8661 27.8661Z"
        fill="#EB142D"
      />
    </SVG>
  );
};
