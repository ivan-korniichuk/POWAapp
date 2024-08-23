import { View, Text } from "react-native";
import BarChartStyles from "../styles/BarChart.style";

const minBarValue = -10;
const maxBarValue = 10;

const BarChartComp = ({ barChartValues, barChartPrevValues }) => {

  const compareArrays = (arr1, arr2) => {
    return arr1.map((value, index) => {
      if (arr2[index] == value) {
        // no change occurred
        return 0;
      } else if ((Math.abs(arr2[index]) / arr2[index]) == (Math.abs(value) / value)) {
        // same sign
        return (Math.abs(arr2[index]) < Math.abs(value)) ? 1 : -1;
      } else {
        // gone to other side
        return -1;
      }
    });
  };

  const changeDirections = compareArrays(barChartPrevValues, barChartValues);

  return (
      <View style={BarChartStyles.barChart}>
          <BarChartRow text1={"Unfocused"} text2={"Servile"} text3={"Scatter-brain"} text4={"Arrogant"}/>

          {/* top chart */}
          <View style={BarChartStyles.chart}>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>

            <TopBars values={barChartValues} changeDirections={changeDirections}/>
          </View>

          <BarChartRow text1={"Perspective"} text2={"Other Centred"} 
            text3={"Willingness to Learn"} text4={"Accurate Self-Assessment"}/>

          {/* bottom chart */}
          <View style={BarChartStyles.chart}>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            
            <BottomBars values={barChartValues} changeDirections={changeDirections}/>
          </View>
          

          <BarChartRow text1={"Blinkered"} text2={"Self-Serving"} 
            text3={"Closed-Minded"} text4={"Self Denigration"}/>

        </View>
  )
}

const Triangle = ({ direction, size = 10, color = 'blue', top = false }) => {
  const styles = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: size / 2,
    borderRightWidth: size / 2,
    borderBottomWidth: direction === 'up' ? size : 0,
    borderTopWidth: direction === 'down' ? size : 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: direction === 'up' ? color : 'transparent',
    borderTopColor: direction === 'down' ? color : 'transparent',
    position: "absolute",
    left: '50%',
    transform: [{ translateX: -5 }]
  };

  if (top) {
    styles["top"] = 0;
  } else {
    styles["bottom"] = 0;
  };

  return <View style={styles} />;
};

const TopBars = ({values, changeDirections}) => {
  const val1 = setMinMax(values[0], 0, maxBarValue);
  const val2 = setMinMax(values[1], 0, maxBarValue);
  const val3 = setMinMax(values[2], 0, maxBarValue);
  const val4 = setMinMax(values[3], 0, maxBarValue);

  return (
    <View style={[BarChartStyles.barsRow, {alignItems: "flex-end",}]}>
      <View style={[BarChartStyles.bar, {height: `${val1/maxBarValue*100}%` }, {borderRightWidth:1}]}>
        { val1 > 0 && (changeDirections[0] != 0) && <Triangle top direction={changeDirections[0] == -1 ? "up" : "down"} color={changeDirections[0] == -1 ? "red" : "green"} /> }
      </View>
      <View style={[BarChartStyles.bar, {height: `${val2/maxBarValue*100}%` }, {borderRightWidth:1}]}>
        { val2 > 0 && (changeDirections[1] != 0) && <Triangle top direction={changeDirections[1] == -1 ? "up" : "down"} color={changeDirections[1] == -1 ? "red" : "green"} /> }
      </View>
      <View style={[BarChartStyles.bar, {height: `${val3/maxBarValue*100}%` }, {borderRightWidth:1}]}>
        { val3 > 0 && (changeDirections[2] != 0) && <Triangle top direction={changeDirections[2] == -1 ? "up" : "down"} color={changeDirections[2] == -1 ? "red" : "green"} /> }
      </View>
      <View style={[BarChartStyles.bar, {height: `${val4/maxBarValue*100}%` }, {borderRightWidth:1}]}>
        { val4 > 0 && (changeDirections[3] != 0) && <Triangle top direction={changeDirections[3] == -1 ? "up" : "down"} color={changeDirections[3] == -1 ? "red" : "green"} /> }
      </View>
    </View>
)}

const BottomBars = ({values, changeDirections}) => {
  const val1 = setMinMax(values[0], minBarValue, 0);
  const val2 = setMinMax(values[1], minBarValue, 0);
  const val3 = setMinMax(values[2], minBarValue, 0);
  const val4 = setMinMax(values[3], minBarValue, 0);

  return (
    <View style={BarChartStyles.barsRow}>
      <View style={[BarChartStyles.bar, {height: `${val1/minBarValue*100}%` }, {borderRightWidth:1}]}>
        { val1 < 0 && (changeDirections[0] != 0) && <Triangle direction={changeDirections[0] == -1 ? "down" : "up"} color={changeDirections[0] == -1 ? "red" : "green"} /> }
      </View>
      <View style={[BarChartStyles.bar, {height: `${val2/minBarValue*100}%` }, {borderRightWidth:1}]}>
        { val2 < 0 && (changeDirections[1] != 0) && <Triangle direction={changeDirections[1] == -1 ? "down" : "up"} color={changeDirections[1] == -1 ? "red" : "green"} /> }
      </View>
      <View style={[BarChartStyles.bar, {height: `${val3/minBarValue*100}%` }, {borderRightWidth:1}]}>
        { val3 < 0 && (changeDirections[2] != 0) && <Triangle direction={changeDirections[2] == -1 ? "down" : "up"} color={changeDirections[2] == -1 ? "red" : "green"} /> }
      </View>
      <View style={[BarChartStyles.bar, {height: `${val4/minBarValue*100}%` }, {borderRightWidth:1}]}>
        { val4 < 0 && (changeDirections[3] != 0) && <Triangle direction={changeDirections[3] == -1 ? "down" : "up"} color={changeDirections[3] == -1 ? "red" : "green"} /> }
      </View>
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