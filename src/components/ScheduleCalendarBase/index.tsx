import dayjs from 'dayjs';
import React, { FC, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Box } from '../Box';
import {
  CalendarEvent,
  DayEvents,
  EventType,
  MonthCalendar,
} from './MonthCalendar';
interface Props {}
const sampleEvents: DayEvents = {
  '2025-09-22': [
    {
      id: '1',
      title: 'Khám tổng quát',
      type: EventType.APPOINTMENT,
      time: '09:00',
    },
    {
      id: '2',
      title: 'Điều trị da',
      type: EventType.TREATMENT,
      time: '14:30',
    },
  ],
  '2025-09-23': [
    {
      id: '3',
      title: 'Tư vấn',
      type: EventType.CONSULTATION,
      time: '10:00',
    },
  ],
  '2025-09-25': [
    {
      id: '4',
      title: 'Tái khám',
      type: EventType.FOLLOW_UP,
      time: '15:00',
    },
    {
      id: '5',
      title: 'Nhắc nhở uống thuốc',
      type: EventType.REMINDER,
      time: '08:00',
    },
    {
      id: '6',
      title: 'Điều trị laser',
      type: EventType.TREATMENT,
      time: '16:30',
    },
    {
      id: '7',
      title: 'Khám da',
      type: EventType.APPOINTMENT,
      time: '17:00',
    },
  ],
};
export const ScheduleCalendarBase: FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const handleEventPress = (date: string, events: CalendarEvent[]) => {
    const eventTitles = events.map(e => `${e.time} - ${e.title}`).join('\n');
    Alert.alert(`Sự kiện ngày ${date}`, eventTitles, [{ text: 'OK' }]);
  };

  const handleDatePress = (date: string) => {
    Alert.alert('Ngày được chọn', `Bạn đã chọn ngày: ${date}`, [
      { text: 'OK' },
    ]);
  };

  const handleSelectedDateChange = (date: string) => {
    setSelectedDate(date);
    console.log('Selected date changed:', date);
  };
  return (
    <Box style={styles.container}>
      <MonthCalendar
        events={sampleEvents}
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
