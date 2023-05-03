import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const ErrorCross = () => {
  return (
    <Svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      // @ts-expect-error TS(2322): Type '{ children: Element[]; width: string; height... Remove this comment to see the full error message
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="80" height="80" rx="16" fill="#FEEDEE" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.5126 27.5126C28.196 26.8291 29.304 26.8291 29.9874 27.5126L40 37.5251L50.0126 27.5126C50.696 26.8291 51.804 26.8291 52.4874 27.5126C53.1709 28.196 53.1709 29.304 52.4874 29.9874L42.4749 40L52.4874 50.0126C53.1709 50.696 53.1709 51.804 52.4874 52.4874C51.804 53.1709 50.696 53.1709 50.0126 52.4874L40 42.4749L29.9874 52.4874C29.304 53.1709 28.196 53.1709 27.5126 52.4874C26.8291 51.804 26.8291 50.696 27.5126 50.0126L37.5251 40L27.5126 29.9874C26.8291 29.304 26.8291 28.196 27.5126 27.5126Z"
        fill="#EB142D"
      />
    </Svg>
  );
};

export default ErrorCross;
