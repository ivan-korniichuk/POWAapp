import React from 'react';
import { View, Button } from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Button
      title="BarChart"
      onPress={() =>
        navigation.navigate('BarChart')
      }/>
      <Button
      title="Slider"
      onPress={() =>
        navigation.navigate('Slider')
      }/>
      <Button
      title="Graph"
      onPress={() =>
        navigation.navigate('Graph')
      }/>
      <Button
      title="Help"
      onPress={() =>
        navigation.navigate('Help')
      }/>
    </View>
  );
};

export default Home;
