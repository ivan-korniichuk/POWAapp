import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { DefaultButton, CustomSlider } from '../components/index';
import { SelfReflectionStyles, HalfButtonStyles } from '../styles/index.style';
import { getTextForValue } from '../utils/contextTextSelector';

const questionRanges = [
  { min: -10, max: -8, text: 'Were your actions convenient for you but perhaps less relevant to the needs of others?' },
  { min: -7.9, max: -6, text: 'Was there a more effective but perhaps difficult/uncomfortable way to behave that you shied away from?' },
  { min: -5.9, max: -3.5, text: 'Did you stick to a plan or an entrenched position when compromise could have been more helpful?' },
  { min: -3.4, max: -1, text: 'Have you deployed sufficient courage to say ‘yes’ to be helpful to others?' },
  { min: -0.9, max: 1, text: 'Have you considered how to carefully balance others’ ‘needs’ and ‘wants’?'},
  { min: 1.1, max: 3.5, text: 'Have you deployed sufficient courage to say ‘no’ in order to protect your capacity to be effective?' },
  { min: 3.6, max: 6, text: 'Did you feel that the expectations others have of you are unrealistic yet fail to address this?' },
  { min: 6.1, max: 8, text: 'Did you behave in a way that avoided potential conflict by agreeing to do too much?' },
  { min: 8.1, max: 10, text: 'Did you fail to consider or disregard your own wellbeing in your how you acted?' },
];

const OtherCentred = ({ response, handleResponseChange }) => {
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
        mainLabel={"Other-centred"} leftLabel={"Self-serving"} 
        rightLabel={"Servile"} 
        onValueChange={(value) => {
          handleResponseChange('value', value);
          setDisplayQuestion(getTextForValue(value, questionRanges));
        }}
        defValue={response.value}
        useSlider={true}
      />
      <Text style={SelfReflectionStyles.description}>(Other-centred description here)</Text>
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

export default OtherCentred;
