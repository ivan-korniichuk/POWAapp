import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import CustomSliderStyle from "../styles/CustomSlider.style"

const ProgressCard = ({ title, leftLabel, rightLabel, value, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.sliderContainer}>
      <Slider
            style={CustomSliderStyle.slider}
            minimumValue={-10}
            maximumValue={10}
            minimumTrackTintColor="#888AC0"
            maximumTrackTintColor="#888AC0"
            thumbTintColor = "#02077E"
            tapToSeek = "True"
            disabled = {true}
            value={value}
        />
        <View style={CustomSliderStyle.sliderLabels}>
          <Text style={[CustomSliderStyle.grey,CustomSliderStyle.text, {textAlign: "left"}]}>{leftLabel}</Text>
          <Text style = {[CustomSliderStyle.grey, CustomSliderStyle.text, {textAlign: "center"}]}>{value}-Score:</Text>
          <Text style={[CustomSliderStyle.grey,CustomSliderStyle.text, {textAlign: "right"}]}>{rightLabel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProgressCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 8, // Reduced padding
    marginVertical: 5, // Reduced vertical margin
    borderRadius: 8, // Reduced border radius
    elevation: 2, // Reduced shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
    marginBottom: 6, // Reduced bottom margin
    textAlign: 'center'
  },
  sliderContainer: {
    alignItems: 'center',
  },
  slider: {
    width: '90%', // Adjusted width
    height: 20, // Reduced height
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', // Adjusted width
    marginTop: 4, // Reduced top margin
  },
  label: {
    fontSize: 10, // Reduced font size
    color: '#777',
  },
  value: {
    fontSize: 12, // Slightly larger font size for value
    fontWeight: 'bold',
    color: '#000',
  },
});
