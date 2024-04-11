import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import CalendarPicker, {ChangedDate} from 'react-native-calendar-picker';

import {Colors} from '../../styles/Style.tsx';
import { createEvent } from '../../services/event/event.services.ts'

interface Dates {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
}

const CreateEvent = ({route}) => {
  const {
    params: {type: eventType},
  } = route;

  const navigation = useNavigation();

  const [form, setForm] = useState({
    id: '';
    name: '';
    description: '';
    intervals: [],
    type: eventType,
  });

  const [selectedDays, setSelectedDays] = useState<Dates>({});
  const [selectedIntervals, setSelectedIntervals] = useState<string[]>([]);
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

  const onSubmit = () => {
    createEvent(form).then(res => {
      navigation.navigate('Event', {id: res.id});
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.calendar} form={form} onSubmit={onSubmit}>
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

        <SelectIntevals
          name="form.intervals"
          selectedDays={selectedIntervals}
          setSelectedDays={setSelectedIntervals}
        />

        <TextInput
          placeholder="Название"
          onChangeText={title => setForm({...form, title})}
        />
        <TextInput
          placeholder="Описание"
          onChangeText={description => setForm({...form, description})}
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
