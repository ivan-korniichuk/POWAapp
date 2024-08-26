import { React, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DefaultButton, TimeSelector, ColoredToggleButton, ProgressGraphComp } from '../components/index';
import { GraphStyles, ScrollViewStyles } from '../styles/index.style';
import { ArrowLeft } from 'react-native-feather';
import { useData } from '../storage/storageService';
import { getAllTimeStats, getLastMonthStats, getLastWeekStats } from '../utils/graphUtils';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const CalendarScreen = ({navigation}) => {
  const { reports } = useData();
  const [ selectedDay, setSelectedDay ] = useState('');
  
  return (
    <View style={GraphStyles.container}>

      <Calendar
        onDayPress={day => {
          setSelectedDay(day.dateString);
        }}
        markedDates={{
          [selectedDay]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
      ></Calendar>

      <DefaultButton containerStyle={styles.topMarginButton} icon={<ArrowLeft color='#ffffff'/>} text='Back' onTouch={() => navigation.navigate('Home')}/>

    </View>
  );

};

const styles = StyleSheet.create({
  topMarginButton: {
    marginTop: 20,
  },
});

export default CalendarScreen;