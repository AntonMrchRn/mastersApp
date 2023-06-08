import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Card, Spacer, Text } from 'rn-ui-kit';

export const CardTasks = ({ test, id, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        marginBottom: 15,
        backgroundColor: 'transparent',
      }}
    >
      <Card style={{ paddingHorizontal: 0 }}>
        <Text variant="title3">{test}</Text>
        <Text variant="bodySRegular">{id}</Text>
        <Text variant="captionRegular">{test}</Text>
        <Text variant="captionRegular">{test}</Text>
      </Card>
      <Spacer size="xs" separator="bottom" />
    </TouchableOpacity>
  );
};
