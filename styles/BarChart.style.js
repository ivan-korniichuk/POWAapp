import { StyleSheet, Dimensions } from 'react-native';
import {COLORS} from '../constants/index'

const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    text: {
      fontSize: 18,
      fontFamily: 'JosefinSans_300Light',
      textAlign: 'center',
    },
    textBoxRow: {
      flexDirection: 'row', 
      height: screenHeight * 0.5 * 0.11,
      width: '25%',
    },
    barsRow: {
      position: 'absolute',
      flexDirection: 'row', 
      width: '25%',
      height: '100%',
    },
    bar: {
      height: 0,
      width: '100%',
      backgroundColor: "rgba(255,255,255,0.65)",
    },
    textBox: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    // 
    barChart: {
      height: screenHeight * 0.5,
    },
    whiteLine: {
      height: 1,
      backgroundColor: 'white',
      marginTop: screenHeight * 0.5 * 0.33 * 0.2,
    },
    chart: {
      // flex: 1,
      height: screenHeight * 0.5 * 0.33,
      backgroundColor: COLORS.primary
    },
    mainButton: {
        // bottom: 0,
    },
    rightBorder: {
        borderRightWidth: 1,
    },
    mainText: {
        color: COLORS.primary,
        fontFamily: 'JosefinSans_700Bold',
        fontSize: 25,
        paddingTop: 12
    }
  });