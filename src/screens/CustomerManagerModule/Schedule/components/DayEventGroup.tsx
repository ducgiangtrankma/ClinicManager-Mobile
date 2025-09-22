import { AppText, Box } from '@src/components';
import { AppLanguage, ScheduleEntity } from '@src/models';
import {
  getDayOfWeek,
  getInfoFromTime,
  getMonthLabel,
  sizes,
} from '@src/utils';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScheduleEntryItem } from './DayEventItem';

interface DayMoodGroupProps {
  schedule: ScheduleEntity;
  dataLength: number;
  index: number;
  language: AppLanguage;
}

export const DayEventGroup = ({
  schedule,
  dataLength,
  index,
  language,
}: DayMoodGroupProps) => {
  const scheduleTime = getInfoFromTime(schedule.implementationTime);
  return (
    <Box style={styles.dayGroup}>
      <Box style={styles.dateHeader}>
        <Box style={styles.dateBox}>
          <AppText
            fontSize="18"
            fontFamily="content_bold"
            style={styles.dateNumber}
          >
            {scheduleTime.day}
          </AppText>
          <AppText
            fontSize="10"
            fontFamily="content_regular"
            style={styles.dateMonth}
          >
            {getMonthLabel(schedule.implementationTime, language)}
          </AppText>
        </Box>
        <Box style={styles.dayLabelContainer}>
          <AppText
            fontSize="16"
            fontFamily="content_bold"
            style={styles.todayLabel}
          >
            {schedule.title}
          </AppText>
          <AppText
            fontSize="12"
            fontFamily="content_medium"
            style={styles.dayLabel}
          >
            {getDayOfWeek(schedule.implementationTime, language)}
          </AppText>
        </Box>
      </Box>

      <Box style={styles.entriesContainer}>
        <ScheduleEntryItem
          key={schedule.id}
          schedule={schedule}
          isLast={index === dataLength - 1}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  dayGroup: {
    marginBottom: sizes._24sdp,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes._12sdp,
  },
  dateBox: {
    width: sizes._48sdp,
    height: sizes._48sdp,
    backgroundColor: '#E0E0E0',
    borderRadius: sizes._12sdp,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: sizes._12sdp,
  },
  dateNumber: {
    lineHeight: sizes._24sdp,
    color: '#333333',
  },
  dateMonth: {
    lineHeight: sizes._12sdp,
    color: '#666666',
  },
  dayLabelContainer: {
    flexDirection: 'column',
  },
  todayLabel: {
    color: '#333333',
  },
  dayLabel: {
    color: '#666666',
  },
  entriesContainer: {
    marginLeft: sizes._4sdp,
  },
});
