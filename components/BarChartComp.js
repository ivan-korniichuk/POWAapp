import { View, Text } from "react-native";
import BarChartStyles from "../styles/BarChart.style";

const minBarValue = -10;
const maxBarValue = 10;

const BarChartComp = ({barChartValues}) => {
  return (
      <View style={BarChartStyles.barChart}>
          <BarChartRow text1={"Unfocused"} text2={"Servile"} text3={"Scatter-brain"} text4={"Arrogant"}/>

          {/* top chart */}
          <View style={BarChartStyles.chart}>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>

            <TopBars values={barChartValues}/>
          </View>

          <BarChartRow text1={"Perspective"} text2={"Other Centred"} 
            text3={"Willingness to Learn"} text4={"Accurate Self-Assessment"}/>

          {/* bottom chart */}
          <View style={BarChartStyles.chart}>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            
            <BottomBars values={barChartValues}/>
          </View>
          

          <BarChartRow text1={"Blinkered"} text2={"Self-Serving"} 
            text3={"Closed-Minded"} text4={"Self Denigration"}/>

        </View>
  )
}

const TopBars = ({values}) => {
  const val1 = setMinMax(values[0], 0, maxBarValue);
  const val2 = setMinMax(values[1], 0, maxBarValue);
  const val3 = setMinMax(values[2], 0, maxBarValue);
  const val4 = setMinMax(values[3], 0, maxBarValue);

  return (
    <View style={[BarChartStyles.barsRow, {alignItems: "flex-end",}]}>
      <View style={[BarChartStyles.bar, {height: `${val1/maxBarValue*100}%` }, {borderRightWidth:1}]}/>
      <View style={[BarChartStyles.bar, { height: `${val2/maxBarValue*100}%` }, {borderRightWidth:1}]}/>
      <View style={[BarChartStyles.bar, { height: `${val3/maxBarValue*100}%` }, {borderRightWidth:1}]}/>
      <View style={[BarChartStyles.bar, { height: `${val4/maxBarValue*100}%` }]}/>
    </View>
)}

const BottomBars = ({values}) => {
  const val1 = setMinMax(values[0], minBarValue, 0);
  const val2 = setMinMax(values[1], minBarValue, 0);
  const val3 = setMinMax(values[2], minBarValue, 0);
  const val4 = setMinMax(values[3], minBarValue, 0);

  return (
    <View style={BarChartStyles.barsRow}>
      <View style={[BarChartStyles.bar, { height: `${val1/minBarValue*100}%` }, {borderRightWidth:1}]}/>
      <View style={[BarChartStyles.bar, { height: `${val2/minBarValue*100}%` }, {borderRightWidth:1}]}/>
      <View style={[BarChartStyles.bar, { height: `${val3/minBarValue*100}%` }, {borderRightWidth:1}]}/>
      <View style={[BarChartStyles.bar, { height: `${val4/minBarValue*100}%` }]}/>
    </View>
)}

const BarChartRow = ({text1,text2,text3,text4}) => {
  return (
    <View style={BarChartStyles.textBoxRow}>
      <View style={[BarChartStyles.textBox, BarChartStyles.rightBorder]}>
        <Text style={BarChartStyles.text}>{text1}</Text>
      </View>
      <View style={[BarChartStyles.textBox, BarChartStyles.rightBorder]}>
        <Text style={BarChartStyles.text}>{text2}</Text>
      </View>
      <View style={[BarChartStyles.textBox, BarChartStyles.rightBorder]}>
        <Text style={BarChartStyles.text}>{text3}</Text>
      </View>
      <View style={BarChartStyles.textBox}>
        <Text style={BarChartStyles.text}>{text4}</Text>
      </View>
    </View>
)}

function setMinMax(value, min, max) {
  if (value < min) {
    return min;
  }
  else if (value > max) {
    return max;
  }
  else
    return value
}

export default BarChartComp;