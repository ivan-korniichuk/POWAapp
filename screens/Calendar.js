import { COLORS } from '../constants/index';

import { React, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DefaultButton, TimeSelector, ColoredToggleButton, ProgressGraphComp } from '../components/index';
import { GraphStyles, ScrollViewStyles } from '../styles/index.style';
import { ArrowLeft } from 'react-native-feather';
import { useData } from '../storage/storageService';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const DOT_TYPES = {
  report: { color: 'orange' },
}

const CalendarScreen = ({navigation}) => {
  const { reports } = useData();
  const [ selectedDay, setSelectedDay ] = useState(null);
  const [ markedDates, setMarkedDates ] = useState({});

  useEffect(() => {
    let newMarkedDates = {};
    if (selectedDay != null) {
      newMarkedDates[selectedDay.dateString] = {selected: true, dots: [], disableTouchEvent: true, selectedColor: COLORS.primary}
    };
    for (let report of reports) {
      let reportDate = moment(report.dateCreatedCli).format("YYYY-MM-DD");
      if (Object.keys(newMarkedDates).includes(reportDate)) {
        newMarkedDates[reportDate].dots.push(DOT_TYPES.report);
      } else {
        newMarkedDates[reportDate] = {dots: [DOT_TYPES.report]};
      }
    }
    setMarkedDates(newMarkedDates);
    console.log(newMarkedDates);
  }, [reports, selectedDay])

  useEffect(() => {
    if (selectedDay == null) return;
    console.log(selectedDay);
    let filteredReports = reports.filter(report => moment(report.dateCreatedCli).format("YYYY-MM-DD") == selectedDay.dateString).sort((a, b) => a.dateCreatedCli - b.dateCreatedCli);
    console.log(filteredReports);
    console.log("===");
  }, [reports, selectedDay])

  return (
    <View style={GraphStyles.container}>

      <ScrollView contentContainerStyle={ScrollViewStyles.scrollViewContent} style={ScrollViewStyles.scrollView}>

        <Calendar
          onDayPress={day => {
            setSelectedDay(day);
          }}
          markingType={'multi-dot'}
          markedDates={markedDates}
          enableSwipeMonths={true}
        ></Calendar>

        <DefaultButton containerStyle={styles.topMarginButton} icon={<ArrowLeft color='#ffffff'/>} text='Back' onTouch={() => navigation.navigate('Home')}/>

      </ScrollView>

    </View>
  );

};

const styles = StyleSheet.create({
  topMarginButton: {
    marginTop: 20,
  },
});

export default CalendarScreen;