import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const TaskSearchClear = () => {
  return (
    <Svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="80" height="80" rx="16" fill="#ECF2FF" />
      <Path
        d="M38.125 51.25C45.3737 51.25 51.25 45.3737 51.25 38.125C51.25 30.8763 45.3737 25 38.125 25C30.8763 25 25 30.8763 25 38.125C25 45.3737 30.8763 51.25 38.125 51.25Z"
        stroke="#3F51B5"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M47.4062 47.4057L55.0001 54.9993"
        stroke="#3F51B5"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default TaskSearchClear;
