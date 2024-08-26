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
  const [ filteredReports, setFilteredReports ] = useState([]);

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
    setFilteredReports(reports.filter(report => moment(report.dateCreatedCli).format("YYYY-MM-DD") == selectedDay.dateString).sort((a, b) => a.dateCreatedCli - b.dateCreatedCli));
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

        <View style={styles.reportsListBox}>
        {
          filteredReports.map(report =>
            <View style={styles.reportBox} key={report._id}>
              <Text style={styles.textBold}>Date created</Text>
              <Text style={styles.text}>{moment(report.dateCreatedCli).format("LLL")}</Text>
              <Text style={styles.textBold}>Perspective</Text>
              <Text style={styles.text}>{report.perspective}</Text>
              <Text style={styles.text}>{report.comment_perspective}</Text>
              <Text style={styles.textBold}>Other Centred</Text>
              <Text style={styles.text}>{report.other_centred}</Text>
              <Text style={styles.text}>{report.comment_other_centred}</Text>
              <Text style={styles.textBold}>Willingness To Learn</Text>
              <Text style={styles.text}>{report.willing_learn}</Text>
              <Text style={styles.text}>{report.comment_willing_learn}</Text>
              <Text style={styles.textBold}>Accurate Self-Assessment</Text>
              <Text style={styles.text}>{report.self_assess}</Text>
              <Text style={styles.text}>{report.comment_self_assess}</Text>
            </View>
          )
        }
        </View>

        <DefaultButton containerStyle={styles.topMarginButton} icon={<ArrowLeft color='#ffffff'/>} text='Back' onTouch={() => navigation.navigate('Home')}/>

      </ScrollView>

    </View>
  );

};

const styles = StyleSheet.create({
  reportsListBox: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
  },
  reportBox: {
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOpacity: 0.2,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
  topMarginButton: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: 'JosefinSans_500Medium',
  },
  textBold: {
    fontSize: 20,
    fontFamily: 'JosefinSans_700Bold',
    marginTop: 20,
  },
});

export default CalendarScreen;