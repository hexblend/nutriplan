import { colors } from '@/lib/constants';
import { format } from 'date-fns';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Animated } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

export default function CalendarBar() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [opacity] = useState(new Animated.Value(0));

  useFocusEffect(
    useCallback(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay: 75,
      }).start();
      return () => {
        opacity.setValue(0);
      };
    }, [])
  );

  return (
    <Animated.View style={{ opacity }}>
      <CalendarStrip
        numDaysInWeek={7}
        scrollable
        scrollerPaging
        style={{
          height: 80,
          marginHorizontal: -16,
          paddingHorizontal: 8,
        }}
        calendarHeaderStyle={{
          color: 'white',
        }}
        // Date
        dateNumberStyle={{ color: 'white', fontSize: 14 }}
        dateNameStyle={{ color: 'white', fontSize: 10 }}
        // Blacklist all days except today
        datesBlacklist={(date) => {
          const dateString = date.format('YYYY-MM-DD');
          return dateString !== today;
        }}
        // Icon
        iconContainer={{ flex: 0.1, marginBottom: 2 }}
        /* eslint-disable */
        iconLeft={require('../../assets/images/chevron-left.png')}
        iconRight={require('../../assets/images/chevron-right.png')}
        calendarAnimation={{ type: 'sequence', duration: 0 }}
        /* eslint-enable */
        // Selected Date
        selectedDate={new Date()}
        dayContainerStyle={{
          borderRadius: 4,
        }}
        highlightDateContainerStyle={{
          borderBottomWidth: 2,
          borderColor: colors.primary[300],
          backgroundColor: colors.primary[800],
        }}
        highlightDateNumberStyle={{ color: 'white', fontSize: 14 }}
        highlightDateNameStyle={{ color: 'white', fontSize: 10 }}
        disabledDateNumberStyle={{ color: 'white', fontSize: 14 }}
        disabledDateNameStyle={{ color: 'white', fontSize: 10 }}
      />
    </Animated.View>
  );
}
