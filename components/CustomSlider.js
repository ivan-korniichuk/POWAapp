import Slider from '@react-native-community/slider';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CustomSliderStyle from "../styles/CustomSlider.style"

const CustomSlider = ({useSlider = false, mainLabel, leftLabel, rightLabel, defValue = 0, onValueChange, onTouch}) => {
    const [value, setValue] = useState(defValue);

    function changeValue(value) {
        setValue(value.toFixed(1))
    }

    return (
        <TouchableOpacity style={CustomSliderStyle.container} onPress={() => {onTouch && onTouch()}}>
            <Text style={CustomSliderStyle.label}>{mainLabel}:</Text>

            <View style={CustomSliderStyle.sliderLabels}>
                <Text style={[CustomSliderStyle.text, {textAlign: "left"}]}>{leftLabel}</Text>
                <Text style = {[CustomSliderStyle.grey, CustomSliderStyle.text, {textAlign: "center"}]}>{value}-Score:</Text>
                <Text style={[CustomSliderStyle.text, {textAlign: "right"}]}>{rightLabel}</Text>
            </View>

            <Slider
                    style={CustomSliderStyle.slider}
                    minimumValue={-10}
                    maximumValue={10}
                    value={value}
                    onValueChange={(value) => {onValueChange && onValueChange(value); useSlider && changeValue(value);}}
                    minimumTrackTintColor="#888AC0"
                    maximumTrackTintColor="#888AC0"
                    thumbTintColor = "#02077E"
                    tapToSeek = "True"
                    disabled = {!useSlider}
            />
        </TouchableOpacity>
    );
};

export default CustomSlider;
