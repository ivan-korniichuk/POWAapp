import React from 'react';
import { Image, ScrollView } from 'react-native';
import { DefaultButton, CustomSlider } from '../components/index';
import { Default } from '../styles/index.style';
import { useData } from '../storage/storageService';

const Home = ({ navigation }) => {
  const { lastReport } = useData();

  const startNewQuestionnaire = () => {
    navigation.navigate('SelfReflection', { reset: true });
  };

  const navigateToQuestionnaire = (page) => {
    navigation.navigate('SelfReflection', { initialPage: page });
  };

  return (
    <ScrollView style={Default.container}>
      <CustomSlider 
        mainLabel={"Perspective"} leftLabel={"Blinkered"}
        rightLabel={"Unfocused"}
        defValue={lastReport.perspective}
        onTouch={() => navigateToQuestionnaire('Perspective')}
      />
      <CustomSlider 
        mainLabel={"Other-Centred"} leftLabel={"Self-serving"}
        rightLabel={"Servile"}
        defValue={lastReport.other_centred}
        onTouch={() => navigateToQuestionnaire('OtherCentred')}
      />
      <CustomSlider 
        mainLabel={"Willingness to Learn"} leftLabel={"Closed-minded"}
        rightLabel={"Scatterbrain"}
        defValue={lastReport.willing_learn}
        onTouch={() => navigateToQuestionnaire('WillingnessToLearn')}
      />
      <CustomSlider 
        mainLabel={"Accurate Self-Assessment"} leftLabel={"Self Denigration"}
        rightLabel={"Arrogant"}
        defValue={lastReport.self_assess}
        onTouch={() => navigateToQuestionnaire('AccurateSelfAssessment')}
      />
      <DefaultButton 
        icon={<Image source={require('../assets/icon1.png')} style={{width: 36, height: 36}} />}
        text='Add New Report'
        onTouch={startNewQuestionnaire}
        containerStyle={{marginVertical: 30}}
      />
      <DefaultButton 
        icon={<Image source={require('../assets/icon2.png')} style={{width: 36, height: 36}} />}
        text='Track My Progress'
        onTouch={() => navigation.navigate('Graph')}
        containerStyle={{marginBottom: 30}}
      />
      <DefaultButton 
        icon={<Image source={require('../assets/icon3.png')} style={{width: 36, height: 36}} />}
        text='My Statistics'
        onTouch={() => navigation.navigate('BarChart')}
        containerStyle={{marginBottom: 30}}
      />
      <DefaultButton 
        icon={<Image source={require('../assets/icon4.png')} style={{width: 36, height: 36}} />}
        text='Help'
        onTouch={() => navigation.navigate('Help')}
      />
    </ScrollView>
  );
};

export default Home;
