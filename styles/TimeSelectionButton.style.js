import { StyleSheet } from 'react-native';
import {COLORS} from '../constants/index'

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    button: {
        paddingRight: 15,
    },
    text: {
      fontSize: 22,
      fontFamily: 'JosefinSans_500Medium'
    },
    customUnderlineText: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.primary,
        paddingBottom: 2,
      }
  });