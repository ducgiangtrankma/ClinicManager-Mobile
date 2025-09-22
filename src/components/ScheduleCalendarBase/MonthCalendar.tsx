import { useAppTheme, useSelector } from '@src/common';

import { LeftArrowIcon, RightArrowIcon } from '@src/assets';
import { APP_FONTS } from '@src/themes';
import { DEFAULT_HIT_SLOP, sizes } from '@src/utils';
import dayjs from 'dayjs';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { AppText } from '../AppText';
import { Box } from '../Box';
import { styles } from './styles';

// Event types để phân loại các loại sự kiện
export enum EventType {
  APPOINTMENT = 'appointment',
  TREATMENT = 'treatment',
  CONSULTATION = 'consultation',
  FOLLOW_UP = 'follow_up',
  REMINDER = 'reminder',
}

// Interface cho từng event
export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  time?: string;
  color?: string;
}

// Interface cho events theo ngày
export interface DayEvents {
  [date: string]: CalendarEvent[];
}

const INITIAL_DATE = dayjs().format('YYYY-MM-DD');

// Cấu hình đa ngôn ngữ cho calendar
const LOCALE_CONFIGS = {
  en: {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
  },
  vi: {
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'T1',
      'T2',
      'T3',
      'T4',
      'T5',
      'T6',
      'T7',
      'T8',
      'T9',
      'T10',
      'T11',
      'T12',
    ],
    dayNames: [
      'Chủ nhật',
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay',
  },
};

interface Props {
  events?: DayEvents;
  onEventPress?: (date: string, events: CalendarEvent[]) => void;
  onDatePress?: (date: string) => void;
  selectedDate?: string;
  onSelectedDateChange?: (date: string) => void;
}

export const MonthCalendar: FC<Props> = ({
  events = {},
  onEventPress,
  onDatePress,
  selectedDate: propSelectedDate,
  onSelectedDateChange,
}) => {
  const { Colors } = useAppTheme();
  const { appLanguage } = useSelector(x => x.languageReducer);

  // State để quản lý tháng hiện tại
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Internal state cho selectedDate nếu không được control từ parent
  const [internalSelectedDate, setInternalSelectedDate] =
    useState(INITIAL_DATE);
  const selectedDate = propSelectedDate || internalSelectedDate;

  // Color mapping cho các loại events - với màu sắc đẹp hơn
  const eventTypeColors = useMemo(
    () => ({
      [EventType.APPOINTMENT]: '#4285F4', // Google Blue
      [EventType.TREATMENT]: '#0F9D58', // Google Green
      [EventType.CONSULTATION]: '#FF6D00', // Deep Orange
      [EventType.FOLLOW_UP]: '#9C27B0', // Material Purple
      [EventType.REMINDER]: '#F44336', // Material Red
    }),
    [],
  );

  // Generate marked dates từ events
  const markedDates = useMemo(() => {
    const marked: any = {};

    Object.keys(events).forEach(date => {
      const dayEvents = events[date];
      if (dayEvents && dayEvents.length > 0) {
        const dots = dayEvents.map(event => ({
          color: event.color || eventTypeColors[event.type],
          selectedDotColor: event.color || eventTypeColors[event.type],
        }));

        marked[date] = {
          dots: dots.slice(0, 3), // Giới hạn tối đa 3 dots
          marked: true,
        };
      }
    });

    return marked;
  }, [events, eventTypeColors]);

  // Cấu hình locale cho calendar
  useMemo(() => {
    const locale = appLanguage === 'vi' ? 'vi' : 'en';
    LocaleConfig.locales[locale] = LOCALE_CONFIGS[locale];
    LocaleConfig.defaultLocale = locale;
  }, [appLanguage]);

  // Navigation functions
  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth(prev => prev.subtract(1, 'month'));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prev => prev.add(1, 'month'));
  }, []);

  // Handle date press
  const handleDatePress = useCallback(
    (day: any) => {
      const dateString = day.dateString;
      const dayEvents = events[dateString] || [];

      // Update selected date
      if (onSelectedDateChange) {
        onSelectedDateChange(dateString);
      } else {
        setInternalSelectedDate(dateString);
      }

      // Handle events or date press callbacks
      if (dayEvents.length > 0 && onEventPress) {
        onEventPress(dateString, dayEvents);
      } else if (onDatePress) {
        onDatePress(dateString);
      }
    },
    [events, onEventPress, onDatePress, onSelectedDateChange],
  );

  // Custom day component với dots
  const renderDayComponent = useCallback(
    ({
      date,
      state,
      marking: _marking,
    }: {
      date: any;
      state: DayState | undefined;
      marking: any;
    }) => {
      const dateString = date?.dateString;
      const dayEvents = events[dateString] || [];
      const isToday = state === 'today';
      const isSelected = dateString === selectedDate;

      return (
        <TouchableOpacity
          onPress={() => handleDatePress(date)}
          style={styles.dayContainer}
          activeOpacity={0.7}
        >
          <Box style={styles.dayContent}>
            <AppText
              fontFamily={isSelected ? 'content_bold' : 'content_regular'}
              color={
                isSelected
                  ? Colors.red
                  : isToday
                  ? Colors.green
                  : Colors.defaultTextColor
              }
              style={[styles.dayNumber, isToday && styles.todayText]}
            >
              {date?.day?.toString()}
            </AppText>
            {/* Event dots - positioned below number */}
            {dayEvents.length > 0 && (
              <Box style={styles.dotsContainer}>
                <Box horizontal style={styles.dotsRow}>
                  {dayEvents.slice(0, 3).map((event, index) => (
                    <Box
                      key={`${event.id}-${index}`}
                      style={[
                        styles.eventDot,
                        {
                          backgroundColor:
                            event.color || eventTypeColors[event.type],
                        },
                      ]}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </TouchableOpacity>
      );
    },
    [events, selectedDate, Colors, handleDatePress, eventTypeColors],
  );
  // Tạo tên tháng theo ngôn ngữ
  const getMonthName = useMemo(() => {
    const monthIndex = currentMonth.month(); // 0-11
    const year = currentMonth.year();
    const locale = appLanguage === 'vi' ? 'vi' : 'en';
    const monthName = LOCALE_CONFIGS[locale].monthNames[monthIndex];
    return appLanguage === 'vi'
      ? `${monthName} ${year}`
      : `${monthName} ${year}`;
  }, [appLanguage, currentMonth]);

  return (
    <Box style={styles.container}>
      <Box
        horizontal
        align="center"
        justify="space-between"
        gap={sizes._8sdp}
        style={{ marginHorizontal: sizes._16sdp }}
      >
        <TouchableOpacity
          hitSlop={DEFAULT_HIT_SLOP}
          onPress={handlePreviousMonth}
        >
          <LeftArrowIcon />
        </TouchableOpacity>
        <AppText
          fontSize="20"
          fontFamily="content_bold"
          color={Colors.defaultTextColor}
        >
          {getMonthName}
        </AppText>
        <TouchableOpacity hitSlop={DEFAULT_HIT_SLOP} onPress={handleNextMonth}>
          <RightArrowIcon />
        </TouchableOpacity>
      </Box>
      <Calendar
        markingType={'multi-dot'}
        key={`calendar-${appLanguage}-${currentMonth.format('YYYY-MM')}`} // Force re-render when month changes
        firstDay={1}
        current={currentMonth.format('YYYY-MM-DD')}
        markedDates={markedDates}
        onDayPress={handleDatePress}
        renderHeader={() => null}
        hideArrows
        hideExtraDays
        dayComponent={({ date, state, marking }) =>
          renderDayComponent({ date, state, marking })
        }
        theme={{
          calendarBackground: Colors.white,
          dayTextColor: Colors.defaultTextColor,
          textDayFontSize: sizes._16sdp,
          textDayFontWeight: '400',
          textDisabledColor: '#CCCCCC',
          textDayHeaderFontSize: sizes._14sdp,
          textDayHeaderFontWeight: '600',
          textSectionTitleColor: Colors.defaultTextColor,
          todayTextColor: Colors.green,
          textDayHeaderFontFamily: APP_FONTS.content_bold,
          // Thêm spacing cho calendar
          arrowColor: Colors.green,
          monthTextColor: Colors.defaultTextColor,
          indicatorColor: Colors.green,
          textMonthFontWeight: 'bold',
          textMonthFontSize: sizes._18sdp,
        }}
        style={{ backgroundColor: Colors.white }}
      />
    </Box>
  );
};
