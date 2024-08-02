import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

margin = 18;

export default StyleSheet.create({
    scrollView: {
        marginHorizontal: -margin,
    },

    scrollViewContent: {
        paddingHorizontal: margin,
    }
});