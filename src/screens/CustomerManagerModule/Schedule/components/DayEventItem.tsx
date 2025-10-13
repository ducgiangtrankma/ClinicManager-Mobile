import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';

import { ScheduleEntity } from '@src/models';
import dayjs from 'dayjs';
import React from 'react';
import { entryItemStyles as styles } from './styles';

interface MoodEntryItemProps {
  schedule: ScheduleEntity;
  isLast?: boolean;
}

export const ScheduleEntryItem = ({
  schedule,
  isLast = false,
}: MoodEntryItemProps) => {
  const { Colors } = useAppTheme();

  return (
    <Box style={styles.entryContainer}>
      <Box style={styles.timelineContainer}>
        <Box style={styles.entryTime}>
          <AppText
            fontSize="12"
            fontFamily="content_medium"
            color={Colors.content}
          >
            {dayjs(schedule.implementationDate).format('hh:mm A')}
          </AppText>
        </Box>
        <Box style={styles.timelineContent}>
          <Box
            style={[
              styles.timelineDot,
              {
                backgroundColor: Colors.dot,
              },
            ]}
          />
          {!isLast && (
            <Box
              style={[styles.timelineLine, { backgroundColor: Colors.dot }]}
            />
          )}
        </Box>
      </Box>

      <Box
        style={[
          styles.entryContentWrapper,
          {
            backgroundColor: Colors.today,
          },
        ]}
      >
        <Box style={styles.entryTextContent}>
          <AppText
            fontSize="14"
            fontFamily="content_regular"
            color={Colors.content}
            style={styles.entryDescription}
          >
            {schedule.note !== '' ? schedule.note : 'Lịch hẹn chưa có nội dung'}
          </AppText>
        </Box>
      </Box>
    </Box>
  );
};
