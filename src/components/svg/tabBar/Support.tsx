import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Support = (prop: any) => {
  return (
    <Svg
      // @ts-expect-error TS(2322): Type '{ children: Element; xmlns: string; width: s... Remove this comment to see the full error message
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={prop.color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-tool"
    >
      <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Svg>
  );
};

export default Support;
