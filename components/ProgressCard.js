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
        <View style={styles.labelsContainer}>
          <Text style={[CustomSliderStyle.grey, CustomSliderStyle.text, {textAlign: "left"}]}>{leftLabel}</Text>
          <Text style = {[CustomSliderStyle.grey, CustomSliderStyle.text, {textAlign: "center"}]}>{value}-Score:</Text>
          <Text style={[CustomSliderStyle.grey, CustomSliderStyle.text, {textAlign: "right"}]}>{rightLabel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProgressCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center'
  },
  sliderContainer: {
    alignItems: 'center',
  },
  slider: {
    width: '90%',
    height: 20,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  label: {
    fontSize: 10,
    color: '#777',
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});
