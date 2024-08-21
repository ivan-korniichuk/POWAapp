import Slider from '@react-native-community/slider';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomSliderStyle from "../styles/CustomSlider.style"

const CustomSlider = ({useSlider = false, mainLabel, leftLabel, rightLabel, defValue = 0, onValueChange, onTouch}) => {
    const [sliderValue, setSliderValue] = useState(defValue);

    function changeValue(value) {
        setSliderValue(isNaN(parseFloat(value.toFixed(1))) ? 0 : parseFloat(value.toFixed(1)));
    }

    useEffect(() => {
        changeValue(defValue);
    }, [defValue])

    return (
        <TouchableOpacity style={CustomSliderStyle.container} onPress={() => {onTouch && onTouch()}}>
            <Text style={CustomSliderStyle.label}>{mainLabel}:</Text>

            <View style={CustomSliderStyle.sliderLabels}>
                <Text style={[CustomSliderStyle.text, {textAlign: "left"}]}>{leftLabel}</Text>
                <Text style = {[CustomSliderStyle.grey, CustomSliderStyle.text, {textAlign: "center"}]}>{sliderValue}-Score:</Text>
                <Text style={[CustomSliderStyle.text, {textAlign: "right"}]}>{rightLabel}</Text>
            </View>

            <Slider
                    style={CustomSliderStyle.slider}
                    minimumValue={-10}
                    maximumValue={10}
                    value={sliderValue}
                    onValueChange={(value) => {
                        const fixedValue = isNaN(parseFloat(value.toFixed(1))) ? 0 : parseFloat(value.toFixed(1));
                        onValueChange && onValueChange(fixedValue);
                        useSlider && setSliderValue(fixedValue);
                    }}
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