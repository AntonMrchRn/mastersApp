import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TaskSearch = (prop: any) => {
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill={prop.color}
      // @ts-expect-error TS(2322): Type '{ children: Element[]; width: string; height... Remove this comment to see the full error message
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.75 10.875C2.75 6.11155 6.61155 2.25 11.375 2.25C16.1384 2.25 20 6.11154 20 10.875C20 15.6384 16.1384 19.5 11.375 19.5C6.61154 19.5 2.75 15.6384 2.75 10.875ZM11.375 3.75C7.43997 3.75 4.25 6.93997 4.25 10.875C4.25 14.81 7.43998 18 11.375 18C15.31 18 18.5 14.81 18.5 10.875C18.5 6.93998 15.31 3.75 11.375 3.75Z"
        fill={prop.color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.4135 15.9131C16.7064 15.6202 17.1812 15.6202 17.4741 15.9131L22.0304 20.4693C22.3233 20.7622 22.3233 21.237 22.0304 21.5299C21.7375 21.8228 21.2627 21.8228 20.9698 21.5299L16.4135 16.9737C16.1206 16.6808 16.1206 16.206 16.4135 15.9131Z"
        fill={prop.color}
      />
    </Svg>
  );
};

export default TaskSearch;
