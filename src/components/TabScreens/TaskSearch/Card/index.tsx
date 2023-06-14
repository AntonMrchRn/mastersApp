import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Card, Spacer, Text } from 'rn-ui-kit';

export const CardTasks = ({ name, description, navigation }, ...props) => {
  console.log('props', props);
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        marginBottom: 15,
        backgroundColor: 'transparent',
      }}
      onPress={() => navigation.navigate('TaskCard')}
    >
      <Card style={{ paddingHorizontal: 0 }}>
        <Text variant="title3">{name}</Text>
        <Text variant="bodySRegular">{description}</Text>
        <Text variant="captionRegular">{description}</Text>
      </Card>
      <Spacer size="xs" separator="bottom" />
    </TouchableOpacity>
  );
};
