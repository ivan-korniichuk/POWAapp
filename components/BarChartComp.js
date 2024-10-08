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

  const compareArraysColour = (arr1, arr2) => {
    return arr1.map((value, index) => {
      if (Math.abs(value) > Math.abs(arr2[index])) return "green";
      if (Math.abs(value) < Math.abs(arr2[index])) return "red";
      return "black";
    });
  };

  const changeDirections = compareArrays(barChartPrevValues, barChartValues);
  const colours = compareArraysColour(barChartPrevValues, barChartValues);

  return (
      <View style={BarChartStyles.barChart}>
          <BarChartRow text1={"Unfocused"} text2={"Servile"} text3={"Scatter-brain"} text4={"Arrogant"}/>

          {/* top chart */}
          <View style={BarChartStyles.chart}>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>

            <TopBars values={barChartValues} barChartValues={barChartValues} barChartPrevValues={barChartPrevValues} changeDirections={changeDirections} colours={colours}/>
          </View>

          <BarChartRow text1={"Perspective"} text2={"Other Centred"} 
            text3={"Willingness to Learn"} text4={"Accurate Self-Assessment"}/>

          {/* bottom chart */}
          <View style={BarChartStyles.chart}>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            <View style={BarChartStyles.whiteLine}/>
            
            <BottomBars values={barChartValues} barChartValues={barChartValues} barChartPrevValues={barChartPrevValues} changeDirections={changeDirections} colours={colours}/>
          </View>
          

          <BarChartRow text1={"Blinkered"} text2={"Self-Serving"} 
            text3={"Closed-Minded"} text4={"Self Denigration"}/>

        </View>
  )
}

const Triangle = ({ children, direction, size = 10, color = 'blue', top = false }) => {
  const styles = {
    container: {
      position: "absolute",
      left: '10%',
      right: '10%',
      top: top ? -10 : 'auto',
      bottom: !top ? -10 : 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "rgba(255,255,255,0.8)",
      padding: 5,
    },
    text: {
      fontSize: 15,
      color: color,
      marginLeft: 5,
    }
  };

  return (
    <View style={styles.container}>
      <TriangleShape direction={direction} size={size} color={color} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const TriangleShape = ({ direction, size = 10, color = 'blue', top = false }) => {
  const styles = {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: size / 2,
    borderRightWidth: size / 2,
    borderBottomWidth: direction === 'up' ? size : 0,
    borderTopWidth: direction === 'down' ? size : 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: direction === 'up' ? color : 'transparent',
    borderTopColor: direction === 'down' ? color : 'transparent',
  };

  return <View style={styles} />;
};

const TopBars = ({values, barChartValues, barChartPrevValues, changeDirections, colours}) => {
  const val1 = setMinMax(values[0], 0, maxBarValue);
  const val2 = setMinMax(values[1], 0, maxBarValue);
  const val3 = setMinMax(values[2], 0, maxBarValue);
  const val4 = setMinMax(values[3], 0, maxBarValue);

  return (
    <View style={[BarChartStyles.barsRow, {alignItems: "flex-end",}]}>
      <View style={[BarChartStyles.bar, {height: `${val1/maxBarValue*100}%` }, {borderRightWidth:1}]}>
        { (() => {
          let change = barChartValues[0] - barChartPrevValues[0];
          return val1 > 0 && (changeDirections[0] != 0) && <Triangle top direction={changeDirections[0] == -1 ? "up" : "down"} color={colours[0]}>{change > 0 ? "+" + change.toFixed(1) : change.toFixed(1)}</Triangle>
        })() }
      </View>
      <View style={[BarChartStyles.bar, {height: `${val2/maxBarValue*100}%` }, {borderRightWidth:1}]}>
        { (() => {
          let change = barChartValues[1] - barChartPrevValues[1];
          return val2 > 0 && (changeDirections[1] != 0) && <Triangle top direction={changeDirections[1] == -1 ? "up" : "down"} color={colours[1]}>{change > 0 ? "+" + change.toFixed(1) : change.toFixed(1)}</Triangle>
        })() }
        </View>
      <View style={[BarChartStyles.bar, {height: `${val3/maxBarValue*100}%` }, {borderRightWidth:1}]}>
        { (() => {
          let change = barChartValues[2] - barChartPrevValues[2];
          return val3 > 0 && (changeDirections[2] != 0) && <Triangle top direction={changeDirections[2] == -1 ? "up" : "down"} color={colours[2]}>{change > 0 ? "+" + change.toFixed(1) : change.toFixed(1)}</Triangle>
        })() }
        </View>
      <View style={[BarChartStyles.bar, {height: `${val4/maxBarValue*100}%` }, {borderRightWidth:1}]}>
        { (() => {
          let change = barChartValues[3] - barChartPrevValues[3];
          return val4 > 0 && (changeDirections[3] != 0) && <Triangle top direction={changeDirections[3] == -1 ? "up" : "down"} color={colours[3]}>{change > 0 ? "+" + change.toFixed(1) : change.toFixed(1)}</Triangle>
        })() }
        </View>
    </View>
)}

const BottomBars = ({values, barChartValues, barChartPrevValues, changeDirections, colours}) => {
  const val1 = setMinMax(values[0], minBarValue, 0);
  const val2 = setMinMax(values[1], minBarValue, 0);
  const val3 = setMinMax(values[2], minBarValue, 0);
  const val4 = setMinMax(values[3], minBarValue, 0);

  return (
    <View style={BarChartStyles.barsRow}>
      <View style={[BarChartStyles.bar, {height: `${val1/minBarValue*100}%` }, {borderRightWidth:1}]}>
        { (() => {
          let change = barChartValues[0] - barChartPrevValues[0];
          return val1 < 0 && (changeDirections[0] != 0) && <Triangle direction={changeDirections[0] == -1 ? "down" : "up"} color={colours[0]}>{change > 0 ? "+" + change.toFixed(1) : change.toFixed(1)}</Triangle>
        })() }
        </View>
      <View style={[BarChartStyles.bar, {height: `${val2/minBarValue*100}%` }, {borderRightWidth:1}]}>
        { (() => {
          let change = barChartValues[1] - barChartPrevValues[1];
          return val2 < 0 && (changeDirections[1] != 0) && <Triangle direction={changeDirections[1] == -1 ? "down" : "up"} color={colours[1]}>{change > 0 ? "+" + change.toFixed(1) : change.toFixed(1)}</Triangle>
        })() }
        </View>
      <View style={[BarChartStyles.bar, {height: `${val3/minBarValue*100}%` }, {borderRightWidth:1}]}>
        { (() => {
          let change = barChartValues[2] - barChartPrevValues[2];
          return val3 < 0 && (changeDirections[2] != 0) && <Triangle direction={changeDirections[2] == -1 ? "down" : "up"} color={colours[2]}>{change > 0 ? "+" + change.toFixed(1) : change.toFixed(1)}</Triangle>
        })() }
        </View>
      <View style={[BarChartStyles.bar, {height: `${val4/minBarValue*100}%` }, {borderRightWidth:1}]}>
        { (() => {
          let change = barChartValues[3] - barChartPrevValues[3];
          return val4 < 0 && (changeDirections[3] != 0) && <Triangle direction={changeDirections[3] == -1 ? "down" : "up"} color={colours[3]}>{change > 0 ? "+" + change.toFixed(1) : change.toFixed(1)}</Triangle>
        })() }
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