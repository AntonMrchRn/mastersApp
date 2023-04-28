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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.5 38.125C23.5 30.0478 30.0478 23.5 38.125 23.5C46.2021 23.5 52.75 30.0478 52.75 38.125C52.75 46.2021 46.2021 52.75 38.125 52.75C30.0478 52.75 23.5 46.2021 23.5 38.125ZM38.125 26.5C31.7047 26.5 26.5 31.7047 26.5 38.125C26.5 44.5452 31.7047 49.75 38.125 49.75C44.5452 49.75 49.75 44.5452 49.75 38.125C49.75 31.7047 44.5452 26.5 38.125 26.5Z"
        fill="#3F51B5"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M46.3457 46.345C46.9314 45.7592 47.8812 45.7592 48.467 46.345L56.0608 53.9387C56.6466 54.5244 56.6466 55.4742 56.0608 56.06C55.4751 56.6458 54.5253 56.6458 53.9395 56.06L46.3457 48.4663C45.7599 47.8806 45.7599 46.9308 46.3457 46.345Z"
        fill="#3F51B5"
      />
    </Svg>
  );
};

export default TaskSearchClear;
