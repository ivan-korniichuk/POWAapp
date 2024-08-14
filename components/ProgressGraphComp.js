import { GraphStyles } from "../styles/index.style";

import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Text as SvgText,
  Polyline,
  Line,
} from 'react-native-svg';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const graphWidth = (screenWidth / (screenHeight/2200));

const BarChartComp = ({statValues, toggledViews}) => {
    return (
        <View style={GraphStyles.progressGraph}>
            <Svg height="100%" width="100%" viewBox={`0 0 ${graphWidth} 1100`}>
                <Line x1="100" y1="0" x2="100" y2="1000" stroke="black" strokeWidth="5" />
                <Line x1="100" y1="1000" x2={graphWidth} y2="1000" stroke="black" strokeWidth="5" />
                <SvgText
                    rotation="90"
                    x="20"
                    y="-20"
                    textAnchor="start"
                    style={GraphStyles.svgText}>Excess
                </SvgText>
                <SvgText
                    rotation="90"
                    x="480"
                    y="-20"
                    textAnchor="end"
                    style={GraphStyles.svgText}>Deficient
                </SvgText>
                <Line x1="50" y1="500" x2={graphWidth} y2="500" stroke="black" strokeWidth="5" strokeDasharray="20" />
                <SvgText
                    rotation="0"
                    x="50"
                    y="525"
                    textAnchor="start"
                    style={GraphStyles.svgText}>Monday
                </SvgText>
                <SvgText
                    rotation="0"
                    fontWeight="bold"
                    x={graphWidth/2}
                    y="525"
                    textAnchor="end"
                    style={GraphStyles.svgText}>Sunday
                </SvgText>
                {toggledViews[0] && <Polyline
                    points={statValuesToPolylinePoints(statValues[0])}
                    fill="none"
                    stroke="#15A9BE"
                    strokeWidth="5"
                />}
                {toggledViews[1] && <Polyline
                    points={statValuesToPolylinePoints(statValues[1])}
                    fill="none"
                    stroke="#02077E"
                    strokeWidth="5"
                />}
                {toggledViews[2] && <Polyline
                    points={statValuesToPolylinePoints(statValues[2])}
                    fill="none"
                    stroke="#0096EA"
                    strokeWidth="5"
                />}
                {toggledViews[3] && <Polyline
                    points={statValuesToPolylinePoints(statValues[3])}
                    fill="none"
                    stroke="black"
                    strokeWidth="5"
                />}
                {toggledViews[4] && <Polyline
                    points={statValuesToPolylinePoints(statValues[4])}
                    fill="none"
                    stroke="#7A49A5"
                    strokeWidth="5"
                />}
            </Svg>
        </View>
    )
}

function statValuesToPolylinePoints(statValues) {

    console.log(statValues);

    let strRes = "";
    let valueCount = statValues.length;
    let firstX = 100;
    let incrementX = Math.floor((graphWidth-100) / (valueCount-1));
    for (value of statValues) {
        // map [-10, 10] to [1000, 0]
        if (value != null) {
            strRes += firstX + "," + ((10-value) * 50) + " ";
        };
        firstX += incrementX;
    };

    console.log(strRes);
    return strRes;

}

export default BarChartComp;