import { StyleSheet, Dimensions } from 'react-native';
import {COLORS} from '../constants/index'

const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    textBox: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainText: {
        color: COLORS.primary,
        fontFamily: 'JosefinSans_700Bold',
        fontSize: 25,
        paddingTop: 12
    },
    progressGraph: {
      height: screenHeight * 0.5,
      alignItems: 'start',
      justifyContent: 'left',
      marginLeft: -30,
    },
    svgText: {
      fontSize: 20,
      scale: "2",
      fontFamily: 'JosefinSans_300Light',
    },
  });