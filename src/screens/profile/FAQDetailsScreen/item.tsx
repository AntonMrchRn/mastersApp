import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';

import { useNavigation } from '@react-navigation/native';
import { Spacer, Text, useTheme } from 'rn-ui-kit';

import ArrowRightIcon from '@/assets/icons/svg/screens/ArrowRightIcon';
import Title from '@/components/tabs/ProfileScreen/Title';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { ProfileScreenNavigationProp } from '@/types/navigation';

import { styles } from './style';

interface SubText {
  text?: string;
}

interface Subsection {
  name?: string;
  answer?: {
    subTitle?: string;
    subText?: string;
    dotSubText?: SubText[];
    numSubText?: SubText[];
    lineRightText?: string;
  }[];
}

type ItemProps = {
  title?: string;
  subsections?: Subsection[];
};
export const Item: FC<ItemProps> = ({ title, subsections }) => {
  const theme = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const navigationAnswer = (
    name?: string,
    answer?: {
      subTitle?: string;
      subText?: string;
      dotSubText?: SubText[];
      numSubText?: SubText[];
      lineRightText?: string;
    }[],
  ) => {
    navigation.navigate(ProfileScreenName.FAQAnswer, { name, answer });
  };

  const subsectionsItem = () => {
    return subsections?.filter(Boolean).map((item, index) => {
      return (
        <View key={index} style={styles.subsectionsWrapper}>
          <TouchableOpacity
            onPress={() => navigationAnswer(item?.name, item?.answer)}
          >
            <ShadowedView style={styles.item}>
              <Text
                variant="bodySRegular"
                color={theme.text.basic}
                style={styles.text}
              >
                {item.name}
              </Text>
              <ArrowRightIcon fill={theme.icons.basic} />
            </ShadowedView>
          </TouchableOpacity>
        </View>
      );
    });
  };
  return (
    <View>
      <Spacer size="xl" />
      {title && <Title title={title} />}
      <Spacer size="l" />
      {subsectionsItem()}
    </View>
  );
};

export default Item;
