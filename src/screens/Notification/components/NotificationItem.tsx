import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';

import { NotificationEntity } from '@src/models';
import { formatDateTime, sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  item: NotificationEntity;
}
export const NotificationItem: FC<Props> = ({ item }) => {
  const { Colors } = useAppTheme();

  const { title, createdAt, message } = item;

  return (
    <Box style={{ marginBottom: sizes._4sdp }}>
      <Box
        horizontal
        style={[
          styles.container,
          {
            backgroundColor: Colors.white,
            borderBottomWidth: sizes._1sdp,
            borderBottomColor: Colors.divider,
          },
        ]}
      >
        <Box style={styles.content}>
          <AppText
            numberOfLines={1}
            fontSize="18"
            fontFamily="content_semibold"
          >
            {title}
          </AppText>
          <AppText numberOfLines={1} fontSize="16">
            {message}
          </AppText>
          <AppText color={Colors.content}>
            {formatDateTime(createdAt, 'dd/mm/yyyy HH:mm')}
          </AppText>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: sizes._8sdp,
    paddingHorizontal: sizes._24sdp,
    gap: sizes._16sdp,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: sizes._4sdp,
  },
});
