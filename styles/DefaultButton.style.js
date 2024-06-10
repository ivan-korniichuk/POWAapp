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
        alignItems: 'flex-start',
        position: 'absolute',
        marginLeft: 15,
        height: '100%',
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        height: 45,
        backgroundColor: COLORS.primary
    }
});