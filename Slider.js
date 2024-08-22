import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import {Dimensions} from 'react-native';

const SelfReflection = () => {
  const [perspective, setPerspective] = useState(0);
  const [reflection, setReflection] = useState('');
  const [answer, setAnswer] = useState(null);

  return (
      <View style={styles.contentView}>
        <Text style={styles.header}>Self-Reflection</Text>
        <View style={styles.perspectiveContainer}>
          <Text style={styles.perspectiveLabel}>Perspective:</Text>
          <View style={styles.sliderLabels}>
            <Text>Blinkered</Text>
            <Text style = {styles.grey}>Z-Score:</Text>
            <Text>Unfocused</Text>
          </View>
          <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={0.5}
              onValueChange={(value) => setPerspective(value)}
              minimumTrackTintColor="#888AC0"
              maximumTrackTintColor="#888AC0"
              thumbTintColor = "#02077E"
              tapToSeek = "True"
          />
        </View>
        <View style={[styles.midpoint, {backgroundColor: 'white', position: 'absolute', top: 123, left: (windowWidth - 5.5)/2, padding: 0}]} />
        <Text style={styles.description}>(Perspective description here)</Text>
        <Text style={styles.askYourself}>Ask Yourself:</Text>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Did you miss seeing the big picture and has this had a detrimental effect?</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
              style={[styles.button, answer === 'yes' && styles.selectedButton]}
              onPress={() => setAnswer('yes')}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.button, answer === 'unsure' && styles.selectedButton]}
              onPress={() => setAnswer('unsure')}
          >
            <Text style={styles.buttonText}>Unsure</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.button, answer === 'no' && styles.selectedButton]}
              onPress={() => setAnswer('no')}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.indication}>This is a good indication that your reflection is accurate</Text>
        <TextInput
            style={styles.textInput}
            placeholder="Add your own short notes and reflections here"
            value={reflection}
            onChangeText={setReflection}
            multiline
        />
        <View style={styles.navigation}>
          <Button
          icon={
            <Icon
            name="arrow-right"
            size={15}
            color="white"
            />
          }
          iconRight   
          title="Back"
          color = "#02077E"
          />
      
          <Button
          icon={
            <Icon
            name="arrow-right"
            size={15}
            color="white"
            />
          }
          iconRight   
          title="Next"
          color = "#02077E"
          />

        </View>
      </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  contentView: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'stretch',
    backgroundColor: '#F5F5F5',
    fontFamily : "bahnschrift",
    flex: 1,
  },

  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'top',
    marginVertical: 10,
    color : "white",
    fontSize : 18,
    paddingVertical : 10,
    backgroundColor : "#02077E"
  },

  perspectiveContainer: {
    marginVertical: 3,
  },

  perspectiveLabel: {
    color: "#02077E",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 20,
    fontFamily: "bahnschrift",
    paddingVertical: 5,
  },

  slider: {
    height: 35,
    width:windowWidth - 70,
    alignSelf: 'center',
  },

  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  description: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
  askYourself: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 10,
    color: "#02077E",
  },
  questionBox: {
    backgroundColor: '#02077E',
    borderRadius: 10,
    margin: 10,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#888AC0',
    padding: 10,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#02077E',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  indication: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 5,
  },
  textInput: {
    borderColor: '#02077E',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,

  },
  midpoint:{
    width: 5,
    height: 20,
  },
  grey:{
    color:"#939393",
  },
});

export default SelfReflection;