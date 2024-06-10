import { TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Check } from 'react-native-feather';

const ColoredToggleButton = ({ untoggledBackgroundColor, toggledBackgroundColor, toggled, onPress}) => {
    const [state, setState] = useState(toggled);

    function onToggleButtonPress() {
        setState(!state)
        onPress()
    }

    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: state ? toggledBackgroundColor : untoggledBackgroundColor}]} onPress={() => onToggleButtonPress()}>
            {state && <Check color='#ffffff'/>}
        </TouchableOpacity>
    )
}

export default ColoredToggleButton;

const styles = StyleSheet.create({
    container: {
        height: 25,
        width: 25,
        borderRadius: 5,
        borderWidth: 1,
    }
})