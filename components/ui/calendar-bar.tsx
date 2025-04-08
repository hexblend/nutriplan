import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { format } from 'date-fns';
import { useFocusEffect } from 'expo-router';
import moment from 'moment';
import 'moment/locale/ro';
import React, { useCallback, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

export default function CalendarBar() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [opacity] = useState(new Animated.Value(0));

  // Configure the locale based on app language
  const currentLocale = t.locale === 'ro' ? 'ro' : 'en';

  // Set moment locale when t.locale changes
  useEffect(() => {
    moment.locale(currentLocale);
  }, [currentLocale]);

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

  // Romanian locale configuration
  const locale = {
    name: currentLocale,
    config: {
      weekdays:
        currentLocale === 'ro'
          ? [
              'Duminică',
              'Luni',
              'Marți',
              'Miercuri',
              'Joi',
              'Vineri',
              'Sâmbătă',
            ]
          : undefined,
      weekdaysShort:
        currentLocale === 'ro'
          ? ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm']
          : undefined,
      weekdaysMin:
        currentLocale === 'ro'
          ? ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ']
          : undefined,
      months:
        currentLocale === 'ro'
          ? [
              'Ianuarie',
              'Februarie',
              'Martie',
              'Aprilie',
              'Mai',
              'Iunie',
              'Iulie',
              'August',
              'Septembrie',
              'Octombrie',
              'Noiembrie',
              'Decembrie',
            ]
          : undefined,
      monthsShort:
        currentLocale === 'ro'
          ? [
              'Ian',
              'Feb',
              'Mar',
              'Apr',
              'Mai',
              'Iun',
              'Iul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ]
          : undefined,
    },
  };

  return (
    <Animated.View style={{ opacity }}>
      <CalendarStrip
        locale={locale}
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
