import { colors } from '@/lib/constants';
import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';

export default function Agenda() {
  return (
    <CalendarStrip
      numDaysInWeek={7}
      //   scrollable
      //   scrollerPaging
      //   calendarHeaderFormat="MMMM"
      calendarColor={colors.primary[700]}
      //  Header
      //   showMonth={false}
      calendarHeaderStyle={{
        color: 'white',
      }}
      calendarHeaderContainerStyle={{ marginTop: 8, marginBottom: 8 }}
      // Date
      dateNumberStyle={{ color: 'white', fontSize: 14 }}
      dateNameStyle={{ color: 'white', fontSize: 10 }}
      // Icon
      iconContainer={{ flex: 0.1, marginBottom: 2 }}
      /* eslint-disable */
      iconLeft={require('../../../assets/images/chevron-left.png')}
      iconRight={require('../../../assets/images/chevron-right.png')}
      /* eslint-enable */
      // Animation
      calendarAnimation={{ type: 'sequence', duration: 50 }}
      // Selected Date
      selectedDate={new Date()}
      highlightDateNumberStyle={{ color: 'white', fontSize: 14 }}
      highlightDateNameStyle={{ color: 'white', fontSize: 10 }}
      dayContainerStyle={{
        borderRadius: 2,
      }}
      highlightDateContainerStyle={{
        borderBottomWidth: 2,
        borderColor: colors.primary[300],
        backgroundColor: colors.primary[800],
      }}
      //   daySelectionAnimation={{
      //     type: 'background',
      //     duration: 200,
      //     highlightColor: colors.secondary[200],
      //   }}
      style={{
        height: 74,
        // paddingBottom: ,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRadius: 16,
        borderColor: colors.primary[800],
      }}
    />
  );
}
