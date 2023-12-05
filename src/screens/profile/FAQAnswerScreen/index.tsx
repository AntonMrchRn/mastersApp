import React from 'react';
import { ScrollView, View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import Header from '@/components/Header';
import { FAQAnswerScreenNavigationProp } from '@/types/navigation';
import { FAQDataAnswer } from '@/utils/FAQdata';

import { styles } from './style';

const FAQAnswerScreen = ({
  route,
}: {
  route: FAQAnswerScreenNavigationProp;
}) => {
  const theme = useTheme();

  const renderSection = (answer?: FAQDataAnswer[]) => {
    const dotTextFunc = (
      item?: {
        text?: string;
      }[],
    ) => {
      return item?.map((item, index) => {
        return (
          <View key={index} style={styles.dotWrap}>
            <View style={styles.dot} />
            <Text variant="bodySRegular">{item?.text}</Text>
          </View>
        );
      });
    };

    const numTextFunc = (
      item?: {
        text?: string;
      }[],
    ) => {
      return item?.map((item, index) => {
        return (
          <View key={index} style={[styles.dotWrap, styles.ph14]}>
            <Text
              variant="bodySRegular"
              style={styles.mr5}
              color={theme.text.accent}
            >
              {index + 1}.
            </Text>
            <Text variant="bodySRegular">{item?.text}</Text>
          </View>
        );
      });
    };

    return answer?.map((item, index) => {
      return (
        <View key={index} style={styles.wrap}>
          {item?.subTitle && <Text variant="bodySBold">{item?.subTitle}</Text>}
          {item?.subText && <Text variant="bodySRegular">{item?.subText}</Text>}
          {item?.dotSubText && dotTextFunc(item?.dotSubText)}
          {item?.numSubText && numTextFunc(item?.numSubText)}
          {item?.lineRightText && (
            <View style={styles.lineContent}>
              <Text variant="bodySRegular">{item?.lineRightText}</Text>
              <Text
                variant="captionRegular"
                style={styles.mt5}
                color={theme.text.neutral}
              >
                МастерА
              </Text>
            </View>
          )}
        </View>
      );
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background.main }]}
    >
      <Header title={route?.params?.name} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.wrapper}
      >
        <Spacer size={'l'} />
        {renderSection(route?.params?.answer)}
        <Spacer size={'s'} />
      </ScrollView>
    </View>
  );
};

export default FAQAnswerScreen;
