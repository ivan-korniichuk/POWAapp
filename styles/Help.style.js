import { StyleSheet, Dimensions } from 'react-native';
import {COLORS} from '../constants/index'

export default StyleSheet.create({

    title: {
      fontSize: 20,
      padding: 10,
      // allignment: 'left',
    },
    info: {
      fontSize: 20,
      paddingVertical: 10.,
      fontFamily : "JosefinSans_400Regular",
    },
    subTitle: {
      color: '#02077E',
      textAlign: 'center',
      fontSize: 24,
      paddingVertical: 10.,
      fontFamily : "JosefinSans_500Medium",
    },
  vidButton: {
      borderRadius: 5,
    },
  vidButtonText: {
      fontSize: 20,
      color: 'blue',
      textAlign: 'left',
      textDecorationLine: 'underline',
      fontFamily : "JosefinSans_400Regular",
    },
});