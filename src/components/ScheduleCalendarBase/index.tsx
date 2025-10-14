import dayjs from 'dayjs';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '../Box';
import { CalendarEvent, DayEvents, MonthCalendar } from './MonthCalendar';
interface Props {
  calendarEvents: DayEvents | undefined;
  onSelectDate: (date: string) => void;
}

export const ScheduleCalendarBase: FC<Props> = ({
  calendarEvents,
  onSelectDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const handleEventPress = (date: string, events: CalendarEvent[]) => {
    const eventTitles = events.map(e => `${e.time} - ${e.title}`).join('\n');
    console.log('eventTitles', eventTitles);
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
        events={calendarEvents}
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
