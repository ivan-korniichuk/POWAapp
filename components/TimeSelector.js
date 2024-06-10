import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import TimeSelectorStyles from "../styles/TimeSelectionButton.style";

const TimeSelector = ({ onSelect, buttonNames = ["Week", "Month", "All Time"]}) => {
    const [activeButton, setActiveButton] = useState("Week");
    
    function createButtons() {
        const buttons = []

        buttonNames.forEach(buttonName => {
            buttons.push(
                <TouchableOpacity style={TimeSelectorStyles.button} key={buttonName} onPress={() => onButtonPress(buttonName)}>
                    <Text style={[TimeSelectorStyles.text]}>{buttonName}</Text>
                    {activeButton === buttonName && <View style={TimeSelectorStyles.customUnderlineText}/>}
                </TouchableOpacity>
            )
        });

        return buttons;
    }

    function onButtonPress( buttonName ) {
        setActiveButton(buttonName)
        onSelect(buttonName)
    }

    return (
        <View style={TimeSelectorStyles.container}>
            {createButtons()}
        </View>
    )
}

export default TimeSelector;