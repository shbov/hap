import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import {getIntervals} from '../../services/event/interval.services.ts';
import {Colors} from '../../styles/Style.tsx';

interface Props {
  name: string;
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
}

export const SelectIntervals = ({selectedDays, setSelectedDays}: Props) => {
  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIntervals()
      .then(data => {
        setIntervals(data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите интервалы</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={intervals}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <IntervalItem
              interval={item}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
          )}
        />
      )}
    </View>
  );
};

interface Interval {
  id: number;
  name: string;
  days: string[];
}

interface IntervalItemProps {
  interval: Interval;
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
}

const IntervalItem = ({
  interval,
  selectedDays,
  setSelectedDays,
}: IntervalItemProps) => {
  const isSelected = selectedDays.includes(interval.name);

  return (
    <View style={styles.item}>
      <Text>{interval.name}</Text>
      <Switch
        value={isSelected}
        onValueChange={() => {
          if (isSelected) {
            setSelectedDays(selectedDays.filter(day => day !== interval.name));
          } else {
            setSelectedDays([...selectedDays, interval.name]);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
});
