import { StyleSheet } from 'react-native';
import {COLORS} from '../constants/index'

export default StyleSheet.create({
    text: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'JosefinSans_700Bold'
    },

    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        height: '100%',
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        // marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        height: 45,
        backgroundColor: COLORS.primary,
        flex: 1
    }
});