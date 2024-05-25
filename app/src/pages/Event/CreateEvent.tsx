import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import CalendarPicker, {ChangedDate} from 'react-native-calendar-picker';

import {SelectIntervals} from '../../components/SelectIntervals/SelectIntervals.tsx';
import {createEvent} from '../../services/event/event.services.ts';
import {Colors} from '../../styles/Style.tsx';

interface Dates {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
}

interface Form {
  id: string;
  name: string;
  description: string;
  intervals: string[];
  type: string;
}

const CreateEvent = ({
  route,
}: {
  route: {
    params: {
      type: string;
    };
  };
}) => {
  const {
    params: {type: eventType},
  } = route;

  const navigation = useNavigation();
  const initialValues = {
    id: '',
    name: '',
    description: '',
    intervals: [],
    type: eventType,
  };

  const [form, setForm] = useState<Form>(initialValues);

  const [selectedDays, setSelectedDays] = useState<Dates>({
    selectedEndDate: null,
    selectedStartDate: null,
  });
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
      if (res.event) {
        // @ts-ignore
        return navigation.navigate('Event', {id: res.event.id});
      }
    });
  };

  const onChangeTitle = (name: string) => {
    setForm({...form, name});
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Formik form={form} onSubmit={onSubmit} initialValues={initialValues}>
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

          <SelectIntervals
            name="form.intervals"
            selectedDays={selectedIntervals}
            setSelectedDays={setSelectedIntervals}
          />

          <TextInput placeholder="Название" onChangeText={onChangeTitle} />
          <TextInput
            placeholder="Описание"
            onChangeText={description => setForm({...form, description})}
          />
        </View>
      </Formik>
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
