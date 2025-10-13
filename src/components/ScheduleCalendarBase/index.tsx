import { ScheduleEntity } from '@src/models';
import { convertToDayEvents } from '@src/utils';
import dayjs from 'dayjs';
import React, { FC, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Box } from '../Box';
import { CalendarEvent, MonthCalendar } from './MonthCalendar';
interface Props {
  schedules: ScheduleEntity[];
  onSelectDate: (date: string) => void;
}

export const ScheduleCalendarBase: FC<Props> = ({
  schedules,
  onSelectDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const handleEventPress = (date: string, events: CalendarEvent[]) => {
    const eventTitles = events.map(e => `${e.time} - ${e.title}`).join('\n');
    Alert.alert(`Sự kiện ngày ${date}`, eventTitles, [{ text: 'OK' }]);
  };

  const handleDatePress = (date: string) => {
    console.log('handleDatePress', date);
  };

  const handleSelectedDateChange = (date: string) => {
    setSelectedDate(date);
    onSelectDate(date);
  };
  return (
    <Box style={styles.container}>
      <MonthCalendar
        events={convertToDayEvents(schedules)}
        onEventPress={handleEventPress}
        onDatePress={handleDatePress}
        selectedDate={selectedDate}
        onSelectedDateChange={handleSelectedDateChange}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
