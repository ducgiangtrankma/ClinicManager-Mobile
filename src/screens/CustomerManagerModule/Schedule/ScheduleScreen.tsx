import { dispatch, useAppTheme, useSelector } from '@src/common';
import {
  AppHeader,
  AppText,
  Box,
  CalendarKit,
  PageContainer,
  ScheduleCalendarBase,
} from '@src/components';
import { dummySchedules, ScheduleType } from '@src/models';
import { DEFAULT_HIT_SLOP, sizes } from '@src/utils';
import React, { FC, useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { ScheduleEntriesList } from './components/ScheduleList';
import { ChangeCalendarModeIcon } from '@src/assets';
import { onChangeScheduleType } from '@src/redux';

interface Props {}

export const CustomerScheduleScreen: FC<Props> = () => {
  const { appLanguage } = useSelector(x => x.languageReducer);
  const { scheduleType } = useSelector(x => x.appReducer);

  const { Colors } = useAppTheme();
  const refreshing = false;
  const onRefresh = useCallback(() => {}, []);

  const onChangeScheduleCalendarMode = useCallback(() => {
    if (scheduleType === ScheduleType.MONTH_CALENDAR) {
      dispatch(onChangeScheduleType({ type: ScheduleType.FULL_CALENDAR }));
    } else {
      dispatch(onChangeScheduleType({ type: ScheduleType.MONTH_CALENDAR }));
    }
  }, [scheduleType]);

  return (
    <PageContainer disablePaddingBottom>
      <AppHeader
        title="schedule_title"
        showBack={false}
        rightContent={
          <TouchableOpacity
            hitSlop={DEFAULT_HIT_SLOP}
            onPress={onChangeScheduleCalendarMode}
          >
            <ChangeCalendarModeIcon />
          </TouchableOpacity>
        }
      />
      {scheduleType === ScheduleType.MONTH_CALENDAR ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.green]}
              tintColor={Colors.green}
            />
          }
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Box style={styles.calendarContainer}>
            <ScheduleCalendarBase />
          </Box>
          <Box style={styles.moodEntriesContainer}>
            <Box style={styles.sectionHeader}>
              <AppText
                translationKey="schedule_list_title"
                fontSize="18"
                fontFamily="content_semibold"
              />
            </Box>
            <ScheduleEntriesList
              data={dummySchedules}
              maxItems={100}
              language={appLanguage}
              refreshing={false}
              onRefresh={() => {}}
            />
          </Box>
        </ScrollView>
      ) : (
        <CalendarKit />
      )}
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {},
  scrollContainer: {
    flex: 1,
  },
  calendarContainer: {
    marginBottom: 16,
  },
  moodEntriesContainer: {},
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
  },
  emptyBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizes._24sdp,
  },
});
