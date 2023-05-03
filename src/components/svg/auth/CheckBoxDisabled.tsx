import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';

const CheckBoxDisabled = () => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      // @ts-expect-error TS(2322): Type '{ children: Element; width: string; height: ... Remove this comment to see the full error message
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x="0.75"
        y="0.75"
        width="18.5"
        height="18.5"
        rx="3.25"
        stroke="#3F51B5"
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default CheckBoxDisabled;
