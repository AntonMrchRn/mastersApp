import * as React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { configApp } from '../../../../utils/helpers/platform';

const Logo = () => {
  const windowHeight = useWindowDimensions().height;
  return (
    <View style={styles.container}>
      <Svg
        width="178"
        height={configApp.android && windowHeight < 593 ? '67' : '114'}
        viewBox="0 0 178 32"
        fill="none"
      >
        <Path
          d="M164.224 0H155.84L149.714 15.235L152.978 18.1062L152.856 22.1198L153.582 22.7706C153.602 22.7408 153.631 22.7209 153.656 22.6961L157.799 12.195L159.639 7.58522C159.678 7.4362 159.806 7.32692 160.012 7.32692C160.179 7.32692 160.346 7.4362 160.385 7.58522L163.895 16.298C163.978 16.6309 163.856 16.7799 163.537 16.7799H159.369L157.308 22.5868H166.133C166.3 22.5868 166.423 22.6613 166.467 22.8451L170.237 32H177.143L164.224 0Z"
          fill="#FF0089"
        />
        <Path
          d="M24 9.14286V32H18.0101V22.4774C18.0101 22.413 17.9648 22.3684 17.8792 22.3485C17.7936 22.3287 17.7232 22.3485 17.6728 22.413L14.3406 28.4805H9.65939L6.28691 22.4477C6.23658 22.3634 6.17617 22.3287 6.10067 22.3485C6.02517 22.3733 5.98993 22.4279 5.98993 22.5121V32H0V9.14286H5.57718L11.8289 20.4252C11.8792 20.4698 11.9346 20.4896 11.995 20.4896C12.0554 20.4896 12.1007 20.4698 12.1258 20.4252L18.3775 9.14286H24Z"
          fill="#3F51B5"
        />
        <Path
          d="M54.8571 32H48.2996L47.2983 29.685C47.2464 29.5314 47.1323 29.457 46.9507 29.457H35.2987C35.143 29.457 35.0289 29.5314 34.9511 29.685L33.9861 32H27.4286L37.1507 9.14286H45.1401L54.8571 32ZM37.4516 23.8208C37.3998 23.9299 37.4153 24.029 37.488 24.1133C37.5658 24.2025 37.6695 24.2422 37.7992 24.2422H44.4761C44.8081 24.2422 44.9274 24.0984 44.8237 23.8158L41.5034 15.9886C41.4256 15.8349 41.2959 15.7606 41.1195 15.7606C40.9379 15.7606 40.8238 15.8349 40.7719 15.9886L37.4516 23.8208Z"
          fill="#3F51B5"
        />
        <Path
          d="M77.7143 28.8995L76.8763 29.4738C74.3965 31.1579 71.554 32 68.344 32C66.57 32 64.8743 31.7226 63.257 31.1677C61.6398 30.6128 60.199 29.8146 58.9395 28.7681C57.6261 27.6778 56.6165 26.4317 55.9157 25.0202C55.21 23.6135 54.8571 22.129 54.8571 20.5714C54.8571 19.0139 55.21 17.5342 55.9157 16.1373C56.6214 14.7403 57.631 13.4992 58.9395 12.4089C60.2039 11.3429 61.6398 10.5301 63.257 9.97518C64.8743 9.4203 66.57 9.14286 68.344 9.14286C71.5246 9.14286 74.3573 9.98491 76.8371 11.6739L77.6751 12.219L75.6315 17.5975L73.9897 16.2541C73.235 15.6359 72.3774 15.1638 71.4217 14.8474C70.4612 14.5262 69.4369 14.3655 68.344 14.3655C67.2512 14.3655 66.222 14.531 65.2615 14.862C64.3009 15.193 63.4433 15.67 62.6935 16.2881C61.233 17.505 60.5077 18.936 60.5077 20.5763C60.5077 21.3891 60.694 22.1582 61.0713 22.898C61.4487 23.633 61.9877 24.2901 62.6935 24.8693C63.4482 25.4875 64.3058 25.9645 65.2615 26.2955C66.222 26.6264 67.2463 26.7919 68.344 26.7919C69.4369 26.7919 70.471 26.6264 71.4413 26.2955C72.4117 25.9645 73.2742 25.4875 74.0289 24.8693L75.6707 23.5259L77.7143 28.8995Z"
          fill="#3F51B5"
        />
        <Path
          d="M102.857 9.14286V14.3588H94.2474C94.0649 14.3588 93.9763 14.4382 93.9763 14.5869V32H87.7744V14.5869C87.7744 14.4382 87.6858 14.3588 87.5034 14.3588H78.8571V9.14286H102.857Z"
          fill="#3F51B5"
        />
        <Path
          d="M142.284 9.14286C143.777 9.14286 145.184 9.40638 146.5 9.92846C147.816 10.4505 148.97 11.1616 149.955 12.0566C150.941 12.9516 151.717 14.0007 152.286 15.2139C152.856 16.4221 153.143 17.7149 153.143 19.0872C153.143 20.3104 152.88 21.5087 152.358 22.6821C151.836 23.8605 151.114 24.9196 150.185 25.8544C149.142 26.8985 147.941 27.6991 146.591 28.241C145.237 28.788 143.801 29.0565 142.284 29.0565H135.947V32H130.286V9.14286H142.284ZM142.245 23.8257C142.959 23.8257 143.629 23.7064 144.256 23.4677C144.882 23.2291 145.438 22.8959 145.911 22.4683C146.385 22.0407 146.759 21.5435 147.031 20.9667C147.304 20.3899 147.443 19.7734 147.443 19.1171C147.443 18.4607 147.304 17.8492 147.031 17.2674C146.759 16.6906 146.39 16.1835 145.926 15.7459C145.462 15.3084 144.916 14.9653 144.289 14.7167C143.662 14.4681 142.992 14.3388 142.279 14.3388H136.335C136.072 14.3388 135.943 14.4581 135.943 14.6968V23.4926C135.943 23.7114 136.072 23.8208 136.335 23.8208H142.245V23.8257Z"
          fill="#3F51B5"
        />
        <Path
          d="M111.55 14.4084C111.356 14.4084 111.238 14.5076 111.238 14.6762V17.8444C111.238 18.0428 111.356 18.1469 111.55 18.1469H123.945V23.353H111.55C111.356 23.353 111.238 23.4521 111.238 23.6554V26.5262C111.238 26.6948 111.356 26.7939 111.55 26.7939H126.857V32H105.143V9.14286H126.857V14.4134H111.55V14.4084Z"
          fill="#3F51B5"
        />
      </Svg>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});