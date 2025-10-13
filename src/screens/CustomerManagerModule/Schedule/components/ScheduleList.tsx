import { AppLanguage, ScheduleEntity } from '@src/models';
import { sizes } from '@src/utils';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';

import { useAppTheme } from '@src/common';
import { Box } from '@src/components';
import { DayEventGroup } from './DayEventGroup';

interface ScheduleListProps {
  data: ScheduleEntity[];
  maxItems?: number;
  style?: object;
  language: AppLanguage;
  refreshing: boolean;
  onRefresh: () => void;
}

export const ScheduleEntriesList = ({
  data,
  maxItems,
  style,
  language,
  refreshing,
  onRefresh,
}: ScheduleListProps) => {
  // Nếu maxItems được cung cấp, chỉ hiển thị số lượng nhóm ngày giới hạn
  const displayData = maxItems ? data?.slice(0, maxItems) : data;
  const { Colors } = useAppTheme();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.green]}
          tintColor={Colors.green}
        />
      }
      style={[styles.container, style]}
      showsVerticalScrollIndicator={false}
    >
      {displayData?.map((schedule, index) => {
        return (
          <DayEventGroup
            index={index}
            key={`${schedule.id}`}
            schedule={schedule}
            dataLength={data.length}
            language={language}
          />
        );
      })}
    </ScrollView>
  );
};

// Nếu không muốn scroll, có thể sử dụng phiên bản này
export const MoodEntriesView = ({
  data,
  maxItems,
  style,
  language,
}: ScheduleListProps) => {
  // Nếu maxItems được cung cấp, chỉ hiển thị số lượng nhóm ngày giới hạn
  const displayData = maxItems ? data?.slice(0, maxItems) : data;

  return (
    <Box style={[styles.viewContainer, style]}>
      {displayData?.map((schedule, index) => {
        return (
          <DayEventGroup
            index={index}
            key={`${schedule.id}`}
            schedule={schedule}
            dataLength={data.length}
            language={language}
          />
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes._16sdp,
  },
  viewContainer: {
    paddingHorizontal: sizes._16sdp,
  },
});
