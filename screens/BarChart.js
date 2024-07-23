import { React, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { DefaultButton, TimeSelector, BarChartComp, ToogleButton, ColoredToggleButton } from '../components/index';
import { ArrowLeft } from 'react-native-feather';
import { BarChartStyles, ScrollViewStyles } from '../styles/index.style';

const BarChart = ({navigation}) => {
  const [barValues, setBarValues] = useState([0,0,0,0]);
  const [features, setFeatures] = useState(["","",""]);

  useEffect(() => {
    onSelect("");
  }, []);

  function updateBarValues (newValues) {
    if (newValues.length === 4) {
      console.log("update");
      setFeatures(analyseValues(newValues));
      setBarValues(newValues);
    }
  }

  function analyseValues(values) {
    const sortedArray = values.slice().sort((a, b) => a - b);

    if (sortedArray[0] < 0) {
      var lowestIndex = values.indexOf(sortedArray[0]);
    }

    if (sortedArray[3] > 0) {
      var highestIndex = values.indexOf(sortedArray[3]);
    }

    const closestToZeroValue = values.reduce((closest, current) =>
        Math.abs(current) < Math.abs(closest) ? current : closest
    );

    var zeroIndex = values.indexOf(closestToZeroValue);

    function getColumn (index) {
      switch (index) {
        case 0:
          return "Perspective"
        case 1:
          return "Other Centred"
        case 2:
          return "Willingness to Learn"
        case 3:
          return "Accurate Self-Assessment"
        default:
          return ""
      }
    }

    return [getColumn(zeroIndex), getColumn(highestIndex), getColumn(lowestIndex)];
  }

  function onSelect(buttonName) {
    // 
    updateBarValues([
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10])
    // 
    console.log(buttonName);
  }
  return (
    <View style={BarChartStyles.container}>
      <TimeSelector onSelect={( buttonName ) => {onSelect(buttonName)}}/>

      <ScrollView contentContainerStyle={ScrollViewStyles.scrollViewContent} style={ScrollViewStyles.scrollView}>
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

      <DefaultButton icon={<ArrowLeft color="#ffffff"/>} text="Back" onTouch={() => navigation.navigate("The POWA Model")}/>

    </View>
  );
};

export default BarChart;

styles = StyleSheet.create({
  progress: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text: {
    fontSize: 20,
    fontFamily: 'JosefinSans_500Medium',
  },
  line: {
    paddingVertical: 12,
  },
});