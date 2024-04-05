import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, Text} from '@rneui/themed';

type SlidersComponentProps = {};

const Sliders: React.FunctionComponent<SlidersComponentProps> = () => {
const [value, setValue] = useState(50);

return (
  <>
    <Text style = {styles.pageHeading}>Self-Reflection</Text>

    <Text style={styles.subHeader}>Perspective:</Text>


    <View style={styles.container}>
    <View style={styles.itemContainer}><Text style = {styles.bodyText}>{'Blinkered'}</Text></View>
    <View style={styles.itemContainer}><Text style = {styles.bodyTextRight}>{'Unfocused'}</Text></View>

</View>

  <Text style = {styles.greyText}>Z-Score</Text>



    <View style={[styles.contentView]}>
      <Slider
        value={value}
        onValueChange={setValue}
        maximumValue={100}
        minimumValue={0}
        step={0.1}
        maximumTrackTintColor = "#888AC0"
        minimumTrackTintColor = "#888AC0"
        trackStyle={{height: 5, borderRadius: 20}}
        allowTouchTrack
        thumbStyle={{ height: 15, width: 15, backgroundColor: "#02077E" }}
      />
    </View>
  </>
);
};

const styles = StyleSheet.create({
contentView: {
  paddingHorizontal: 15,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'stretch',
},

subHeader: {
  backgroundColor : "white",
  color : "#02077E",
  textAlign : "center",
  fontWeight : 700,
  fontSize : 20,
  fontFamily : "bahnschrift",
  paddingVertical :10,
},

bodyText: {
  //textAlign : "left",
  fontSize : 15,
  fontFamily : "bahnschrift",
  paddingHorizontal : 15 
},

bodyTextRight:{
  textAlign : "right",
  fontSize : 15,
  fontFamily : "bahnschrift",
  paddingHorizontal : 15 
},

greyText : {
  color : "#939393",
  fontWeight : 300,
  textAlign : "center",
  fontSize : 15,
  fontFamily : "bahnschrift",
  paddingHorizontal : 15 
},


  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start'
  },
  itemContainer: {
    width: '50%',
  },

  pageHeading:{
    color : "white",
    fontFamily : "bahnschrift",
    fontWeight : 700,
    fontSize : 15,
    paddingHorizontal : 45,
    paddingVertical : 10,
    backgroundColor : "#02077E"
  }
});



export default Sliders;