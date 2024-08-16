import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { DefaultButton, CustomSlider } from '../components/index';
import { SelfReflectionStyles, HalfButtonStyles } from '../styles/index.style';
import { getTextForValue } from '../utils/contextTextSelector';

const questionRanges = [
  { min: -10, max: -8, text: 'Were you deploying false modesty to gain the attention and praise of others?' },
  { min: -7.9, max: -6, text: 'Did you downplay what you could offer the situation to minimise the risk of feeling exposed?' },
  { min: -5.9, max: -3.5, text: 'Did you feel you had more to offer or ask, but lack the courage to act/speak up?' },
  { min: -3.4, max: -1, text: 'Were you clear on your strengths and weaknesses and did your behaviour reflect these?' },
  { min: -0.9, max: 1, text: 'Did your actions/behaviours meet the expectations of your role and of your peers?'},
  { min: 1.1, max: 3.5, text: 'Did you share your strengths in a way that was useful to others?' },
  { min: 3.6, max: 6, text: 'Were your behaviours misaligned with the expectations of your role?' },
  { min: 6.1, max: 8, text: 'Were you unwilling to back down even though you knew a different approach could be better?' },
  { min: 8.1, max: 10, text: 'Did you get it wrong? Were your behaviours in fact more concerned with you feeling good than genuinely helping others?' },
];

const AccurateSelfAssessment = ({ response, handleResponseChange }) => {
  const [displayQuestion, setDisplayQuestion] = useState(getTextForValue(response.value, questionRanges));

  return (
    <ScrollView style={SelfReflectionStyles.container}>
      <CustomSlider 
        mainLabel={"Accurate Self-Assessment"} leftLabel={"Self Denigration"} 
        rightLabel={"Arrogant"} 
        onValueChange={(value) => {
          handleResponseChange('value', value);
          setDisplayQuestion(getTextForValue(value, questionRanges));
        }}
        defValue={response.value}
        useSlider={true}
      />
      <Text style={SelfReflectionStyles.description}>(Accurate self-assessment description here)</Text>
      <Text style={SelfReflectionStyles.askYourself}>Ask Yourself:</Text>
      <View style={SelfReflectionStyles.questionBox}>
        <Text style={SelfReflectionStyles.questionText}>{displayQuestion}</Text>
      </View>
      <View style={SelfReflectionStyles.buttonGroup}>
        <DefaultButton 
          containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, 2 === 1 && SelfReflectionStyles.selectedButton]} 
          text="1" 
          onTouch={() => handleResponseChange('number', 1)}
        />
        <DefaultButton 
          containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, 2 === 2 && SelfReflectionStyles.selectedButton]} 
          text="2" 
          onTouch={() => handleResponseChange('number', 2)}
        />
        <DefaultButton 
          containerStyle={[HalfButtonStyles.container, SelfReflectionStyles.button, 2 === 3 && SelfReflectionStyles.selectedButton]} 
          text="3" 
          onTouch={() => handleResponseChange('number', 3)}
        />
      </View>
      <Text style={SelfReflectionStyles.indication}>This is a good indication that your reflection is accurate</Text>
      <TextInput
        style={SelfReflectionStyles.textInput}
        placeholder="Add your own short notes and reflections here"
        value={response.comment}
        onChangeText={(value) => handleResponseChange('comment', value)}
        multiline
      />
    </ScrollView>
  );
};

export default AccurateSelfAssessment;
