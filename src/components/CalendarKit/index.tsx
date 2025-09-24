import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  LocaleConfigsProps,
} from '@howljs/calendar-kit';
import { useAppTheme } from '@src/common';
import React, { FC, useState } from 'react';
import { AppText } from '../AppText';
import { sizes } from '@src/utils';
const initialLocales: Record<string, Partial<LocaleConfigsProps>> = {
  en: {
    weekDayShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'), // Text in day header (Sun, Mon, etc.)
    meridiem: { ante: 'am', post: 'pm' }, // Hour format (hh:mm a)
    more: 'more', // Text for "more" button (All day events)
  },
  ja: {
    weekDayShort: '日_月_火_水_木_金_土'.split('_'),
    meridiem: { ante: '午前', post: '午後' },
    more: 'もっと',
  },
  vi: {
    weekDayShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    meridiem: { ante: 'sa', post: 'ch' },
    more: 'Xem thêm',
  },
};
interface Props {}
export const CalendarKit: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const [events, setEvents] = useState<any>([
    {
      id: '1',
      title: 'Trị mụn Phương Thanh',
      start: { dateTime: '2025-09-20T05:00:00Z' },
      end: { dateTime: '2025-09-20T11:00:00Z' },
      color: '#4285F4',
    },
    {
      id: '2',
      title: 'Chăm sóc da',
      start: { dateTime: '2025-09-20T05:30:00Z' },
      end: { dateTime: '2025-09-20T11:00:00Z' },
      color: '#4285F4',
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const handleDragCreateStart = (start: any) => {
    console.log('Started creating event at:', start);
    // You can use this to show a UI indicator that event creation has started
  };

  const handleDragCreateEnd = (event: any) => {
    console.log('New event:', event);
    setEvents([
      ...events,
      {
        ...event,
        title: 'Chăm sóc da 1',
        color: '#4285F4',
        id: '3',
      },
    ]);
    // Here you would typically add the new event to your events array
    // and possibly open a modal for the user to add more details
  };

  const handleDragEditStart = (event: any) => {
    console.log('Started editing event:', event);
    // You can use this to show a UI indicator that event editing has started
  };

  const handleDragEditEnd = (event: any) => {
    console.log('Event edited:', event);
    setSelectedEvent(event);
    // Here you would typically update the event in your events array
    // and possibly update your backend or state management
  };
  return (
    <CalendarContainer
      scrollByDay={true}
      initialLocales={initialLocales}
      allowDragToCreate={true}
      allowDragToEdit={true}
      selectedEvent={selectedEvent}
      onPressEvent={event => {
        console.log('Event pressed:', event);
      }}
      onLongPressEvent={event => {
        console.log('Event long-pressed:', event);
      }}
      onDateChanged={date => console.log('Date', date)} // Change date scroll header
      locale="vi"
      overlapType="no-overlap"
      events={events}
      onDragCreateEventStart={handleDragCreateStart}
      onDragCreateEventEnd={handleDragCreateEnd}
      onDragEventStart={handleDragEditStart}
      onDragEventEnd={handleDragEditEnd}
      theme={{
        colors: {
          background: Colors.defaultPageBackground,
        },
        hourTextStyle: {
          fontSize: sizes._16sdp,
        },
        dayNumber: {
          fontSize: sizes._16sdp,
        },
        todayNumberContainer: {
          backgroundColor: Colors.green,
        },
        todayNumber: {
          fontSize: sizes._18sdp,
          color: Colors.white,
        },
      }}
    >
      <CalendarHeader
        LeftAreaComponent={<AppText textAlign="center">A</AppText>}
      />
      <CalendarBody />
    </CalendarContainer>
  );
};
