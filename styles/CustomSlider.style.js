import { StyleSheet } from 'react-native';
import {COLORS} from '../constants/index'

export default StyleSheet.create({
    container: {
      marginVertical: 3,
    },
    label: {
      color: COLORS.primary,
      textAlign: "center",
      fontSize: 20,
      fontFamily: "JosefinSans_500Medium",
      paddingVertical: 5,
    },
    text: {
      flex: 1,
      fontFamily: "JosefinSans_500Medium",
    },
  
    slider: {
      height: 35,
      alignSelf: 'center',
      width: '100%',
    },
  
    sliderLabels: {
      flexDirection: 'row',
      fontFamily: "JosefinSans_500Medium",
    },
    grey:{
      color: COLORS.grey,
    },
  });