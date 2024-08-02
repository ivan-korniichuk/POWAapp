import { React, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DefaultButton, TimeSelector, ColoredToggleButton, ProgressGraphComp } from '../components/index';
import { GraphStyles, ScrollViewStyles } from '../styles/index.style';
import { ArrowLeft } from 'react-native-feather';

function generateRandomStatValuesList(count) {

  let arr = [Math.floor((Math.random() * 20) - 10)];
  while (arr.length < count) {
      arr.push(Math.floor(0.3*(arr[arr.length-1]) + 0.7*((Math.round(Math.random() * 20) - 10))));
  };

  return arr;

}

const Graph = ({navigation}) => {
  
  const [statValues, setStatValues] = useState([
    generateRandomStatValuesList(7),
    generateRandomStatValuesList(7),
    [null, null, null, 4, 5, null, 3],
    generateRandomStatValuesList(7),
    generateRandomStatValuesList(7),
  ]);
  const [toggledViews, setToggledViews] = useState([true, false, false, false, false]);

  function onSelect(buttonName) {
    console.log(buttonName);
  }

  function toggleToggledView(index) {
    let oldToggledViews = Array.from(toggledViews);
    oldToggledViews[index] = !oldToggledViews[index];
    setToggledViews(oldToggledViews);
  }
  
  return (
    <View style={GraphStyles.container}>

      <TimeSelector onSelect={( buttonName ) => {onSelect(buttonName)}}/>

      <ScrollView contentContainerStyle={ScrollViewStyles.scrollViewContent} style={ScrollViewStyles.scrollView}>

      <ProgressGraphComp statValues={statValues} toggledViews={toggledViews} />

      <Text style={GraphStyles.mainText}>Plot:</Text>

      <View style={[gs.plotCheckboxes, gs.line]}>
        <Text style={gs.text}>Overall Average</Text>
        <ColoredToggleButton toggledBackgroundColor='#15A9BE' untoggledBackgroundColor='#FFFFFF' toggled={toggledViews[0]} onPress={() => { toggleToggledView(0); }} />
      </View>

      <View style={[gs.plotCheckboxes, gs.line]}>
        <Text style={gs.text}>Perspective</Text>
        <ColoredToggleButton toggledBackgroundColor='#02077E' untoggledBackgroundColor='#FFFFFF' toggled={toggledViews[1]} onPress={() => { toggleToggledView(1); }} />
      </View>

      <View style={[gs.plotCheckboxes, gs.line]}>
        <Text style={gs.text}>Other-centred</Text>
        <ColoredToggleButton toggledBackgroundColor='#0096EA' untoggledBackgroundColor='#FFFFFF' toggled={toggledViews[2]} onPress={() => { toggleToggledView(2); }} />
      </View>

      <View style={[gs.plotCheckboxes, gs.line]}>
        <Text style={gs.text}>Willingness to Learn</Text>
        <ColoredToggleButton toggledBackgroundColor='#000000' untoggledBackgroundColor='#FFFFFF' toggled={toggledViews[3]} onPress={() => { toggleToggledView(3); }} />
      </View>

      <View style={[gs.plotCheckboxes, gs.line]}>
        <Text style={gs.text}>Accurate Self-Assessment</Text>
        <ColoredToggleButton toggledBackgroundColor='#7A49A5' untoggledBackgroundColor='#FFFFFF' toggled={toggledViews[4]} onPress={() => { toggleToggledView(4); }} />
      </View>
      </ScrollView>

      <DefaultButton icon={<ArrowLeft color='#ffffff'/>} text='Back' onTouch={() => navigation.navigate('Home')}/>

    </View>
  );

};

export default Graph;

gs = StyleSheet.create({
  plotCheckboxes: {
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