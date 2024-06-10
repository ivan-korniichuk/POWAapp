<<<<<<< Updated upstream
import React from 'react';
import { View} from 'react-native';
=======
import { React, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { DefaultButton, TimeSelector, BarChartComp, ToogleButton, ColoredToggleButton } from '../components/index';
import { ArrowLeft } from 'react-native-feather';
import { BarChartStyles } from '../styles/index.style';
>>>>>>> Stashed changes

const BarChart = ({navigation}) => {
  return (
<<<<<<< Updated upstream
    <View>
=======
    <View style={BarChartStyles.container}>
      <TimeSelector onSelect={( buttonName ) => {onSelect(buttonName)}}/>

      <ScrollView>
        <BarChartComp barChartValues={barValues}/>

        <View style={styles.progress}>
          <Text style={styles.text}>Show Progress Direction</Text>
          <ColoredToggleButton untoggledBackgroundColor={"white"} toggledBackgroundColor={"#3FCBB0"} toggled={false} onPress={()=>{}}/>
        </View>

        <Text style={BarChartStyles.mainText}>General:</Text>
        <Text style={[styles.text, styles.line]}>Most balanced feature: {features[0]}</Text>
        <Text style={[styles.text, styles.line]}>Most excessive feature: {features[1]}</Text>
        <Text style={[styles.text, styles.line]}>Most deficient feature: {features[2]}</Text>
      </ScrollView>

      <DefaultButton icon={<ArrowLeft color='#ffffff'/>} text='Back' onTouch={() => navigation.navigate('Home')}/>

>>>>>>> Stashed changes
    </View>
  );
};

export default BarChart;