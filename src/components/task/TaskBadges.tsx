import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Badge } from 'rn-ui-kit';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Badge';

export type TaskBadge = {
  label: string;
  icon: boolean | JSX.Element;
  variant: Variant;
  secondary?: boolean;
};
type TaskBadgesProps = {
  badges: TaskBadge[];
};
export const TaskBadges: FC<TaskBadgesProps> = ({ badges }) => {
  const styles = StyleSheet.create({
    badges: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    badge: {
      marginRight: 4,
      marginVertical: 4,
    },
  });
  return (
    <View style={styles.badges}>
      {badges.map(badge => (
        <Badge
          secondary={badge?.secondary}
          label={badge.label}
          icon={badge.icon}
          variant={badge.variant}
          style={styles.badge}
          key={badge.label}
        />
      ))}
    </View>
  );
};
