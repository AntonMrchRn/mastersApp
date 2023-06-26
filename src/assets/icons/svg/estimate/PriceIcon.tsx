import React from 'react';
import SVG, { Path } from 'react-native-svg';

export const PriceIcon = () => {
  return (
    <SVG width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5198 0.00993586C17.229 0.0746692 17.0234 0.329086 17.0241 0.623411C17.0243 0.702027 17.0381 0.765302 17.0904 0.926777C17.1655 1.15868 17.2426 1.47709 17.2858 1.73418C17.4069 2.45349 17.3989 3.06887 17.2617 3.60918C17.2118 3.80549 17.1617 3.93974 17.0659 4.13418C16.8534 4.56497 16.559 4.96638 16.1296 5.41065C16.075 5.46713 16.0277 5.51334 16.0245 5.51334C16.0213 5.51334 15.8906 5.33428 15.7341 5.11543C15.5775 4.89657 15.4237 4.68788 15.3921 4.65166C15.1909 4.42051 14.9022 4.25733 14.5698 4.18693L14.4781 4.16751L12.8281 4.16502C11.6525 4.16324 11.1542 4.1652 11.0948 4.17184C10.8559 4.19853 10.6412 4.27541 10.449 4.40308C10.3184 4.48979 1.60681 10.6625 1.529 10.7234C1.49219 10.7523 1.42631 10.8115 1.3826 10.8552C0.880988 11.3558 0.705371 12.0989 0.929321 12.7733C0.969596 12.8945 1.0474 13.0627 1.10803 13.1596C1.19005 13.2906 4.46091 18.0727 4.51326 18.1382C5.04755 18.8062 6.00711 19.0199 6.77973 18.643C6.83843 18.6144 6.91084 18.576 6.94063 18.5576C7.00674 18.517 16.022 12.1933 16.1295 12.1122C16.347 11.948 16.5376 11.6788 16.624 11.4135C16.6482 11.339 17.3345 8.27114 17.3605 8.12095C17.4094 7.83858 17.3649 7.52842 17.237 7.25918C17.188 7.15615 17.1252 7.06052 16.9086 6.75918L16.759 6.55084L16.9649 6.34251C17.1779 6.12704 17.3142 5.97742 17.4666 5.79191C17.8028 5.38256 18.0932 4.92125 18.2687 4.5177C18.6707 3.59276 18.7304 2.44153 18.4434 1.14668C18.3706 0.818552 18.251 0.417386 18.1973 0.321677C18.1141 0.173386 17.972 0.0613775 17.8115 0.0176442C17.7387 -0.00218913 17.5917 -0.00607247 17.5198 0.00993586ZM14.3948 5.43553C14.4131 5.44544 14.4398 5.46607 14.454 5.48136C14.4683 5.49666 14.6106 5.69249 14.7703 5.91654L15.0606 6.32392L15.036 6.34402C14.9978 6.37533 14.5872 6.64791 14.5006 6.69952L14.423 6.74573L14.3647 6.70803C14.3327 6.68728 14.2607 6.64823 14.2048 6.62123C13.6366 6.34683 12.9685 6.41679 12.4615 6.80379C12.3862 6.8612 12.237 7.00892 12.1782 7.08418C11.8293 7.53059 11.726 8.09898 11.8964 8.63418C11.949 8.79924 12.053 8.99649 12.1644 9.14251C12.2218 9.21773 12.3695 9.36697 12.4448 9.42578C12.8912 9.77468 13.4596 9.87802 13.9948 9.70757C14.1599 9.655 14.3571 9.551 14.5031 9.43956C14.5783 9.38215 14.7276 9.23443 14.7864 9.15917C14.9871 8.90238 15.1063 8.60836 15.1413 8.28418C15.153 8.17492 15.1464 7.95643 15.1283 7.85918C15.1215 7.82251 15.1158 7.79135 15.1158 7.79135C15.1158 7.79135 15.1597 7.76281 15.2135 7.72935C15.3378 7.65213 15.6141 7.46822 15.7097 7.39908C15.75 7.36994 15.7862 7.34811 15.7902 7.35058C15.8009 7.35722 16.0949 7.77174 16.1095 7.80084C16.1411 7.86393 16.1521 7.80758 15.7908 9.43439C15.6025 10.2822 15.443 10.995 15.4363 11.0184C15.4289 11.0443 15.412 11.0742 15.3928 11.0949C15.3522 11.1389 6.32254 17.4735 6.24244 17.5142C6.15339 17.5594 6.07961 17.5758 5.96563 17.5756C5.85003 17.5753 5.79166 17.5615 5.68461 17.5089C5.52766 17.4318 5.67028 17.6298 3.82663 14.93C2.92053 13.6031 2.16525 12.4902 2.14823 12.4568C2.10292 12.3679 2.08653 12.2941 2.08675 12.18C2.08698 12.0644 2.10082 12.006 2.15339 11.899C2.22885 11.7453 1.84707 12.0235 6.6698 8.60817C11.7649 4.99996 11.1437 5.4383 11.181 5.4249C11.2058 5.41603 11.5054 5.41432 12.7865 5.41575L14.3615 5.41751L14.3948 5.43553Z"
        fill="#707070"
      />
    </SVG>
  );
};
