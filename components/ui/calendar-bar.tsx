import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { format } from 'date-fns';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Animated } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

export default function CalendarBar() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [opacity] = useState(new Animated.Value(0));
  const currentLocale = t.locale === 'ro' ? 'ro' : 'en';

  useFocusEffect(
    useCallback(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        delay: 70,
      }).start();
      return () => {
        opacity.setValue(0);
      };
    }, [])
  );

  return (
    <Animated.View style={{ opacity }}>
      <CalendarStrip
        locale={getLocale(currentLocale)}
        numDaysInWeek={7}
        scrollable
        scrollerPaging
        // Monday / Sunday first
        startingDate={
          new Date(
            new Date().setDate(
              new Date().getDate() -
                (currentLocale === 'ro'
                  ? new Date().getDay() === 0
                    ? 6
                    : new Date().getDay() - 1
                  : new Date().getDay())
            )
          )
        }
        style={{
          height: 80,
          marginHorizontal: -20,
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
        iconContainer={{ flex: 0.1, marginBottom: 2, paddingHorizontal: 8 }}
        /* eslint-disable */
        iconLeft={require('../../assets/images/chevron-left.png')}
        iconLeftStyle={{ width: 20, height: 20, marginRight: -10 }}
        iconRight={require('../../assets/images/chevron-right.png')}
        iconRightStyle={{ width: 20, height: 20, marginLeft: -10 }}
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

const getLocale = (currentLocale: string) => {
  return {
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
          : [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
      weekdaysShort:
        currentLocale === 'ro'
          ? ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm']
          : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdaysMin:
        currentLocale === 'ro'
          ? ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ']
          : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
          : [
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
          : [
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
    },
  };
};
