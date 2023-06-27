import React, { FC } from 'react';
import SVG, { Path } from 'react-native-svg';

export const NoHistoryIcon: FC<{ color?: string }> = ({
  color = '#D5D5D6',
}) => {
  return (
    <SVG width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.4143 1.57947C14.8721 0.0739819 18.6999 -0.368371 22.41 0.308741C26.1201 0.985854 29.5448 2.7518 32.248 5.3817C34.9512 8.01161 36.8105 11.3865 37.5893 15.0766C38.368 18.7668 38.031 22.6052 36.6211 26.1031C35.2111 29.6011 32.7921 32.6003 29.672 34.7189C26.5519 36.8375 22.8718 37.9796 19.1005 37.9997C15.3291 38.0199 11.637 36.9173 8.49442 34.8322C5.3518 32.7472 2.9008 29.774 1.4535 26.2913C1.35758 26.0743 1.30599 25.8403 1.30178 25.603C1.29756 25.3657 1.3408 25.13 1.42895 24.9097C1.5171 24.6894 1.64839 24.4889 1.8151 24.32C1.98181 24.1511 2.18059 24.0172 2.39976 23.9262C2.61893 23.8352 2.85407 23.789 3.09137 23.7901C3.32868 23.7913 3.56336 23.8398 3.78164 23.9329C3.99991 24.026 4.19738 24.1618 4.36245 24.3323C4.52752 24.5028 4.65686 24.7046 4.74288 24.9257C6.0682 28.1156 8.42507 30.7688 11.4365 32.461C14.4479 34.1531 17.9398 34.7864 21.3536 34.2595C24.7675 33.7326 27.9059 32.076 30.267 29.5547C32.6281 27.0334 34.0754 23.793 34.3773 20.352C34.6792 16.9109 33.8183 13.4681 31.9324 10.5741C30.0464 7.68013 27.2444 5.5023 23.9745 4.38898C20.7045 3.27566 17.1557 3.29119 13.8956 4.43308C10.6356 5.57497 7.85269 7.77724 5.99213 10.6876H10.0938C10.5662 10.6876 11.0192 10.8753 11.3533 11.2093C11.6873 11.5434 11.875 11.9964 11.875 12.4688C11.875 12.9413 11.6873 13.3943 11.3533 13.7284C11.0192 14.0624 10.5662 14.2501 10.0938 14.2501H0V4.15635C0 3.68393 0.187667 3.23086 0.521716 2.89681C0.855765 2.56277 1.30883 2.3751 1.78125 2.3751C2.25367 2.3751 2.70673 2.56277 3.04078 2.89681C3.37483 3.23086 3.5625 3.68393 3.5625 4.15635V7.9231C5.56022 5.14016 8.27319 2.94673 11.4143 1.57947ZM19 7.1251C19.4724 7.1251 19.9255 7.31277 20.2595 7.64681C20.5936 7.98086 20.7812 8.43393 20.7812 8.90635V18.2638L25.612 23.0946C25.787 23.2577 25.9274 23.4543 26.0247 23.6728C26.1221 23.8913 26.1744 24.1272 26.1787 24.3664C26.1829 24.6055 26.1389 24.8431 26.0493 25.0649C25.9597 25.2867 25.8264 25.4882 25.6572 25.6573C25.4881 25.8265 25.2866 25.9598 25.0648 26.0494C24.843 26.139 24.6054 26.183 24.3663 26.1788C24.1271 26.1745 23.8912 26.1222 23.6727 26.0248C23.4542 25.9275 23.2576 25.7871 23.0945 25.6121L17.7412 20.2588L17.2188 19.7364V8.90635C17.2188 8.43393 17.4064 7.98086 17.7405 7.64681C18.0745 7.31277 18.5276 7.1251 19 7.1251Z"
        fill={color}
      />
    </SVG>
  );
};
