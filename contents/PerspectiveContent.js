import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { DefaultButton, CustomSlider } from '../components/index';
import { SelfReflectionStyles, HalfButtonStyles } from '../styles/index.style';
import { getTextForValue } from '../utils/contextTextSelector';

const questionRanges = [
  { min: -10, max: -8, text: 'Did you miss seeing the big picture and has this had a detrimental effect?' },
  { min: -7.9, max: -6, text: 'Did you miss seeing things from another person’s perspective?' },
  { min: -5.9, max: -3.5, text: 'Are you sure you’re out of balance? Sometimes a narrowed perspective is appropriate. Blinkered is about missing things not about a conscious decision to bring helpful focus to a situation.' },
  { min: -3.4, max: -1, text: 'Did you consider a broad range of factors that could be influencing the situation/person?' },
  { min: -0.9, max: 1, text: 'Are you sure you’re balanced? Perspective isn’t just about getting things rightn it is about ensuring you haven’t missed.'},
  { min: 1.1, max: 3.5, text: 'Were your behaviours/actions appropriate when adopting a wide angled lens?' },
  { min: 3.6, max: 6, text: 'Are you sure you’re out of balance? Keeping an open mind and collecting information from multiple sources can be appropriate in certain contexts.' },
  { min: 6.1, max: 8, text: 'Did you feel uncomfortable, unable to see the wood from the trees?' },
  { min: 8.1, max: 10, text: 'Did you struggle to prioritise where to focus your efforts, not being sure what was and wasn’t important?' },
];

const Perspective = ({ response, handleResponseChange }) => {
  const [displayQuestion, setDisplayQuestion] = useState(getTextForValue(response.value, questionRanges));
  
  return (
    <ScrollView style={SelfReflectionStyles.container}>
      <CustomSlider 
        mainLabel={"Perspective"} leftLabel={"Blinkered"} 
        rightLabel={"Unfocused"} 
        onValueChange={(value) => {
          handleResponseChange('value', value);
          setDisplayQuestion(getTextForValue(value, questionRanges));
        }}
        defValue={response.value}
        useSlider={true}
      />
      <Text style={SelfReflectionStyles.description}>(Perspective description here)</Text>
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

export default Perspective;
