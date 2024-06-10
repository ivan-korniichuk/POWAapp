import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/DefaultButton.style'

const DefaultButton = ({icon = null, text = "", containerStyle, textStyle, iconStyle, onTouch}) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={() => {onTouch && onTouch()}}>
            {icon && <View style={[iconStyle, styles.iconContainer]}>{icon}</View>}
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default DefaultButton;