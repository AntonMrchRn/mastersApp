import React from 'react';
import { ScrollView, View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import Header from '@/components/Header';
import { FAQAnswerScreenNavigationProp } from '@/types/navigation';

import { styles } from './style';

type AnswerType = {
  subTitle?: string;
  subText?: string;
  dotSubText?: { text?: string }[];
  numSubText?: { text?: string }[];
  lineRightText?: string;
}[];

const FAQAnswerScreen = ({
  route,
}: {
  route: FAQAnswerScreenNavigationProp;
}) => {
  const theme = useTheme();

  const renderSection = (answer?: AnswerType) => {
    const dotTextFunc = (
      item?: {
        text?: string;
      }[],
    ) => {
      return item?.map((item, index) => {
        return (
          <View key={index} style={styles.dotWrap}>
            <View style={styles.dot} />
            <Text variant="bodyMRegular">{item?.text}</Text>
          </View>
        );
      });
    };

    const NumTextFunc = (
      item?: {
        text?: string;
      }[],
    ) => {
      return item?.map((item, index) => {
        return (
          <View key={index} style={[styles.dotWrap, styles.ph10]}>
            <Text
              variant="bodySRegular"
              style={[styles.mt2, styles.mr5]}
              color={theme.text.accent}
            >
              {index + 1}.
            </Text>
            <Text variant="bodyMRegular">{item?.text}</Text>
          </View>
        );
      });
    };

    return answer?.map((item, index) => {
      return (
        <View key={index} style={styles.wrap}>
          {item?.subTitle && <Text variant="bodyMBold">{item?.subTitle}</Text>}
          {item?.subText && <Text variant="bodySRegular">{item?.subText}</Text>}
          {item?.dotSubText && (
            <View style={styles.pv5}>{dotTextFunc(item?.dotSubText)}</View>
          )}
          {item?.numSubText && (
            <View style={styles.pv5}>{NumTextFunc(item?.numSubText)}</View>
          )}
          {item?.lineRightText && (
            <View style={styles.lineContent}>
              <Text variant="bodySRegular">{item?.lineRightText}</Text>
              <Text variant="captionRegular" color={theme.text.neutral}>
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
