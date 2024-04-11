import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import CalendarPicker, {ChangedDate} from 'react-native-calendar-picker';

import {Colors} from '../../styles/Style.tsx';

interface Dates {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
}

const CreateEvent = ({route}) => {
  const {
    params: {type: eventType},
  } = route;

  const [selectedDays, setSelectedDays] = useState<Dates>({});
  const setSelected = (date: Date, type: ChangedDate) => {
    if (type === 'END_DATE') {
      setSelectedDays({
        ...selectedDays,
        selectedEndDate: date,
      });
    } else {
      setSelectedDays({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.calendar}>
        <CalendarPicker
          onDateChange={setSelected}
          allowRangeSelection
          startFromMonday
          previousTitle={'<'}
          nextTitle={'>'}
          selectedDayTextColor={Colors.white}
          selectedDayColor={Colors.primary}
          todayBackgroundColor={'none'}
          scaleFactor={375}
          weekdays={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
          months={[
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ]}
          todayTextStyle={{
            color: Colors.dark,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 16,
  },

  safe: {
    backgroundColor: Colors.background,
  },
});

export default CreateEvent;
