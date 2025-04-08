import { colors } from '@/lib/constants';
import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';

export default function Agenda() {
  return (
    <CalendarStrip
      numDaysInWeek={7}
      scrollable
      scrollerPaging
      calendarColor={colors.primary[700]}
      //  Header
      showMonth={false}
      // Date
      dateNumberStyle={{ color: 'white' }}
      dateNameStyle={{ color: 'white' }}
      // Icon
      iconContainer={{ flex: 0.1 }}
      // Animation
      calendarAnimation={{ type: 'sequence', duration: 50 }}
      // Selected Date
      selectedDate={new Date()}
      highlightDateNameStyle={{ color: 'white' }}
      highlightDateNumberStyle={{ color: 'white' }}
      highlightDateContainerStyle={{
        backgroundColor: colors.primary[400],
        borderRadius: 8,
        paddingBottom: 12,
        paddingTop: 12,
        paddingHorizontal: 8,
        width: 36,
        // borderBottomWidth: 3,
        // borderColor: colors.primary[300],
      }}
      //   daySelectionAnimation={{
      //     type: 'background',
      //     duration: 200,
      //     highlightColor: colors.secondary[200],
      //   }}
      style={{
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRadius: 16,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: colors.primary[800],
      }}
    />
  );
}
