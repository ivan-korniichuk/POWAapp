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
          style={styles.calendar}
        ></Calendar>

        <View>
        {
          filteredReports.map(report =>
            <View style={styles.reportListBox} key={report.dateCreatedCli}>
              <Text style={styles.textBold}>Date created</Text>
              <Text style={styles.text}>{moment(report.dateCreatedCli).format("LLL")}</Text>

              <View style={styles.row}>
                <Text style={styles.textBold}>Perspective</Text>
                <Text style={[styles.text, styles.right]}>{report.perspective}</Text>
              </View>
              <Text style={styles.text}>{report.comment_perspective}</Text>

              <View style={styles.row}>
                <Text style={styles.textBold}>Other Centred</Text>
                <Text style={[styles.text, styles.right]}>{report.other_centred}</Text>
              </View>
              <Text style={styles.text}>{report.comment_other_centred}</Text>

              <View style={styles.row}>
                <Text style={styles.textBold}>Willingness To Learn</Text>
                <Text style={[styles.text, styles.right]}>{report.willing_learn}</Text>
              </View>
              <Text style={styles.text}>{report.comment_willing_learn}</Text>

              <View style={styles.row}>
                <Text style={styles.textBold}>Accurate Self-Assessment</Text>
                <Text style={[styles.text, styles.right]}>{report.self_assess}</Text>
              </View>
              <Text style={styles.text}>{report.comment_self_assess}</Text>
            </View>
          )
        }
        </View>
      </ScrollView>
        <DefaultButton containerStyle={styles.topMarginButton} icon={<ArrowLeft color='#ffffff'/>} text='Back' onTouch={() => navigation.navigate('Home')}/>

    </View>
  );

};

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 8,
  },
  reportListBox: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
  },
  topMarginButton: {
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: 'JosefinSans_500Medium',
    flex: 1,
  },
  textBold: {
    fontSize: 20,
    fontFamily: 'JosefinSans_700Bold',
  },
  right: {
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
  }
});

export default CalendarScreen;