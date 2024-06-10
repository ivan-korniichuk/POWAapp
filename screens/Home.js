import React from 'react';
import { Image, ScrollView } from 'react-native';
import { DefaultButton, CustomSlider } from '../components/index';
import { BarChartStyles } from '../styles/index.style';

const Home = ({navigation}) => {
  return (
    <ScrollView style={BarChartStyles.container}>
      <CustomSlider 
        mainLabel={"Perspective"} leftLabel={"Blinkered"}
        rightLabel={"Unfocused"} onValueChange={() => navigation.navigate('SelfReflection')}
        onTouch={() => navigation.navigate('SelfReflection')}
      />
      <CustomSlider 
        mainLabel={"Other-Centred"} leftLabel={"Self-serving"}
        rightLabel={"Servile"} onValueChange={() => navigation.navigate('SelfReflection')}
        onTouch={() => navigation.navigate('SelfReflection')}
      />
      <CustomSlider 
        mainLabel={"Willingness to Learn"} leftLabel={"Closed-minded"}
        rightLabel={"Scatterbrain"} onValueChange={() => navigation.navigate('SelfReflection')}
        onTouch={() => navigation.navigate('SelfReflection')}
      />
      <CustomSlider 
        mainLabel={"Accurate Self-Assessment"} leftLabel={"Self Denigration"}
        rightLabel={"Arrogant"} onValueChange={() => navigation.navigate('SelfReflection')}
        onTouch={() => navigation.navigate('SelfReflection')}
      />
      <DefaultButton 
        icon={<Image source={require('../assets/icon3.png')} 
        style={{width: 36, height: 36}}/>}
        text='Self - Reflection'
        onTouch={() => navigation.navigate('SelfReflection')}
        containerStyle={{marginVertical: 30}}
      />
      <DefaultButton 
        icon={<Image source={require('../assets/icon2.png')} 
        style={{width: 36, height: 36}}/>} 
        text='Track My Progress'
        onTouch={() => navigation.navigate('Graph')}
        containerStyle={{marginBottom: 30}}
      />
      <DefaultButton 
        icon={<Image source={require('../assets/icon3.png')} 
        style={{width: 36, height: 36}}/>} 
        text='My Statistics'
        onTouch={() => navigation.navigate('BarChart')}
        containerStyle={{marginBottom: 30}}
      />
      <DefaultButton 
        icon={<Image source={require('../assets/icon4.png')} 
        style={{width: 36, height: 36}}/>} 
        text='Help'
        onTouch={() => navigation.navigate('Help')}
      />
    </ScrollView>
  );
};

export default Home
