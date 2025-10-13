import { dispatch, useAppTheme, useSelector } from '@src/common';
import {
  AppActivityIndicator,
  AppHeader,
  AppText,
  Box,
  CalendarKit,
  PageContainer,
  ScheduleCalendarBase,
} from '@src/components';
import { ScheduleType } from '@src/models';
import { ACTIVE_OPACITY_TOUCH, DEFAULT_HIT_SLOP, sizes } from '@src/utils';
import React, { FC, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { ScheduleEntriesList } from './components/ScheduleList';
import { ChangeCalendarModeIcon, PlusIcon } from '@src/assets';
import { onChangeScheduleType } from '@src/redux';
import { useScheduleQuery } from '@src/services';
import dayjs from 'dayjs';
import { EmptyListSchedule } from './components/EmptySchedule';
import { APP_SCREEN, navigate } from '@src/navigator';
import { useFocusEffect } from '@react-navigation/native';

interface Props {}

export const CustomerScheduleScreen: FC<Props> = () => {
  const { appLanguage } = useSelector(x => x.languageReducer);
  const { scheduleType } = useSelector(x => x.appReducer);
  const { Colors } = useAppTheme();
  const [startDate, setStartDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

  const { data, isLoading, refetch } = useScheduleQuery(startDate, endDate);
  const refreshing = false;
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const onChangeScheduleCalendarMode = useCallback(() => {
    if (scheduleType === ScheduleType.MONTH_CALENDAR) {
      dispatch(onChangeScheduleType({ type: ScheduleType.FULL_CALENDAR }));
    } else {
      dispatch(onChangeScheduleType({ type: ScheduleType.MONTH_CALENDAR }));
    }
  }, [scheduleType]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

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
            <ScheduleCalendarBase
              schedules={data ?? []}
              onSelectDate={date => {
                setStartDate(date);
                setEndDate(date);
              }}
            />
          </Box>
          <Box style={styles.moodEntriesContainer}>
            <Box
              style={styles.sectionHeader}
              horizontal
              justify="space-between"
              align="center"
            >
              <AppText
                translationKey="schedule_list_title"
                fontSize="18"
                fontFamily="content_semibold"
              />
              <TouchableOpacity
                onPress={() =>
                  navigate(APP_SCREEN.CREATE_SCHEDULE, {
                    date: startDate,
                  })
                }
                activeOpacity={ACTIVE_OPACITY_TOUCH}
                hitSlop={DEFAULT_HIT_SLOP}
                style={[
                  styles.addButton,
                  {
                    borderColor: Colors.green,
                  },
                ]}
              >
                <PlusIcon color={Colors.green} />
              </TouchableOpacity>
            </Box>
            {data?.length ? (
              <ScheduleEntriesList
                data={data ?? []}
                maxItems={100}
                language={appLanguage}
                refreshing={false}
                onRefresh={() => {}}
              />
            ) : (
              <Box>
                {isLoading ? (
                  <AppActivityIndicator animating={isLoading} />
                ) : (
                  <EmptyListSchedule description="schedule_create" />
                )}
              </Box>
            )}
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
    paddingHorizontal: sizes._16sdp,
    paddingVertical: sizes._10sdp,
    marginBottom: sizes._10sdp,
  },
  emptyBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizes._24sdp,
  },
  addButton: {
    borderWidth: sizes._1sdp,
    borderRadius: sizes._99sdp,
  },
});
