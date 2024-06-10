import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { DefaultButton, CustomSlider } from '../components/index';
import { SelfReflectionStyles, HalfButtonStyles, BarChartStyles } from '../styles/index.style';

const SelfReflection = ({navigation}) => {
  const [perspective, setPerspective] = useState(0);
  const [reflection, setReflection] = useState('');
  const [answer, setAnswer] = useState("unsure");

  return (
      <View style={BarChartStyles.container}>
        <ScrollView style={SelfReflectionStyles.container}>
        <CustomSlider 
          mainLabel={"Perspective"} leftLabel={"Blinkered"} 
          rightLabel={"Unfocused"} onValueChange={setPerspective}
          useSlider={true}
        />
        <Text style={SelfReflectionStyles.description}>(Perspective description here)</Text>
        <Text style={SelfReflectionStyles.askYourself}>Ask Yourself:</Text>
        <View style={SelfReflectionStyles.questionBox}>
          <Text style={SelfReflectionStyles.questionText}>Did you miss seeing the big picture and has this had a detrimental effect?</Text>
        </View>
        <View style={SelfReflectionStyles.buttonGroup}>
          <DefaultButton containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, answer === 'yes' && SelfReflectionStyles.selectedButton]} text='Yes' onTouch={() => setAnswer('yes')}/>
          <DefaultButton containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, answer === 'unsure' && SelfReflectionStyles.selectedButton]} text='Unsure' onTouch={() => setAnswer('unsure')}/>
          <DefaultButton containerStyle={[HalfButtonStyles.container, SelfReflectionStyles.button, answer === 'no' && SelfReflectionStyles.selectedButton]} text='No' onTouch={() => setAnswer('no')}/>
        </View>
        <Text style={SelfReflectionStyles.indication}>This is a good indication that your reflection is accurate</Text>
        <TextInput
            style={SelfReflectionStyles.textInput}
            placeholder="Add your own short notes and reflections here"
            value={reflection}
            onChangeText={setReflection}
            multiline
        />
        </ScrollView>
        <View style={SelfReflectionStyles.navigation}>
          <DefaultButton containerStyle={[HalfButtonStyles.container, {marginRight: 20}]} text='Back' onTouch={() => navigation.navigate('Home')}/>
          <DefaultButton containerStyle={HalfButtonStyles.container} text='Next'/>
        </View>
      </View>
  );
};

export default SelfReflection;