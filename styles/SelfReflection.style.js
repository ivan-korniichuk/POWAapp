import { StyleSheet, Dimensions } from 'react-native';
import {COLORS} from '../constants/index'

const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
container: {
    flex: 1,
    height: '100%',
    width: '100%',
    },
description: {
    fontSize: 14,
    fontFamily: "JosefinSans_500Medium",
},
askYourself: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 15,
    color: "#02077E",
    fontFamily: "JosefinSans_500Medium",
},
questionBox: {
    backgroundColor: '#02077E',
    borderRadius: 10,
    marginVertical: 10,
},
questionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    fontFamily: "JosefinSans_500Medium",
},
buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
},
button: {
    backgroundColor: '#888AC0',
    fontFamily: "JosefinSans_500Medium",
},
selectedButton: {
    backgroundColor: '#02077E',
},
indication: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 15,
    fontFamily: "JosefinSans_500Medium",
},
textInput: {
    borderColor: '#02077E',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    minHeight: screenHeight * 0.2,
    textAlignVertical: 'top',
    fontFamily: "JosefinSans_500Medium",
},
navigation: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: "JosefinSans_500Medium",
},
});