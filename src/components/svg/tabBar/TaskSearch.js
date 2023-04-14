import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TaskSearch = prop => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11.375 18.75C15.7242 18.75 19.25 15.2242 19.25 10.875C19.25 6.52576 15.7242 3 11.375 3C7.02576 3 3.5 6.52576 3.5 10.875C3.5 15.2242 7.02576 18.75 11.375 18.75Z"
        stroke={prop.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.9438 16.4434L21.5001 20.9996"
        stroke={prop.color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default TaskSearch;
