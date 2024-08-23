import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { DefaultButton, CustomSlider } from '../components/index';
import { SelfReflectionStyles, HalfButtonStyles } from '../styles/index.style';
import { getTextForValue } from '../utils/contextTextSelector';

const questionRanges = [
  { min: -10, max: -8, text: 'Did you fail to admit your error or lack of knowledge?' },
  { min: -7.9, max: -6, text: 'Did you avoid receiving feedback from those around you?' },
  { min: -5.9, max: -3.5, text: 'Were you unwilling to consider compromise, especially on long held beliefs?' },
  { min: -3.4, max: -1, text: 'Were you curious and did you ask effective questions?' },
  { min: -0.9, max: 1, text: 'Did you deploy sufficient courage to seek out new knowledge and understanding?'},
  { min: 1.1, max: 3.5, text: 'Did you listen carefully to the answers?' },
  { min: 3.6, max: 6, text: 'Did you cover a lot of ground but lack depth in your analysis/approach?' },
  { min: 6.1, max: 8, text: 'Did you confuse those around you rather than bring clarity?' },
  { min: 8.1, max: 10, text: 'Did you fail to dedicate sufficient time to the relevant focus in an attempt to influence multiple factors?' },
];

const WillingnessToLearn = ({ response, handleResponseChange }) => {
  const [displayQuestion, setDisplayQuestion] = useState(getTextForValue(response.value, questionRanges));
  const [answer, setAnswer] = useState('Unsure');
  const [answerText, setAnswerText] = useState('It might help to take a bit more time to clarify your thoughts.');

  function changeAnswer(newAnswer) {
    setAnswer(newAnswer);
    handleResponseChange('answer', newAnswer);
  }

  return (
    <ScrollView style={SelfReflectionStyles.container}>
      <CustomSlider 
        mainLabel={"Willingness to Learn"} leftLabel={"Closed-minded"} 
        rightLabel={"Scatterbrain"} 
        onValueChange={(value) => {
          handleResponseChange('value', value);
          setDisplayQuestion(getTextForValue(value, questionRanges));
        }}
        defValue={response.value}
        useSlider={true}
      />
      <Text style={SelfReflectionStyles.description}>(Willingness to learn description here)</Text>
      <Text style={SelfReflectionStyles.askYourself}>Ask Yourself:</Text>
      <View style={SelfReflectionStyles.questionBox}>
        <Text style={SelfReflectionStyles.questionText}>{displayQuestion}</Text>
      </View>
      <View style={SelfReflectionStyles.buttonGroup}>
        <DefaultButton 
          containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, answer === 'Yes' && SelfReflectionStyles.selectedButton]} 
          text="Yes" 
          onTouch={() => {
            changeAnswer('Yes');
            setAnswerText('This is a good indication that your reflection is accurate');
          }}
        />
        <DefaultButton 
          containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, answer === 'Unsure' && SelfReflectionStyles.selectedButton]} 
          text="Unsure" 
          onTouch={() => {
            changeAnswer('Unsure');
            setAnswerText('It might help to take a bit more time to clarify your thoughts.');
          }}
        />
        <DefaultButton 
          containerStyle={[HalfButtonStyles.container, SelfReflectionStyles.button, answer === 'No' && SelfReflectionStyles.selectedButton]} 
          text="No" 
          onTouch={() => {
            changeAnswer('No');
            setAnswerText('This suggests your initial reflection may not be accurate.');
          }}
        />
      </View>
      <Text style={SelfReflectionStyles.indication}>{answerText}</Text>
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

export default WillingnessToLearn;
