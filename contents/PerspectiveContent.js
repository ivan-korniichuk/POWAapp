import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { DefaultButton, CustomSlider } from '../components/index';
import { SelfReflectionStyles, HalfButtonStyles } from '../styles/index.style';

const Perspective = ({ response, handleResponseChange }) => {
  return (
    <ScrollView style={SelfReflectionStyles.container}>
      <CustomSlider 
        mainLabel={"Perspective"} leftLabel={"Blinkered"} 
        rightLabel={"Unfocused"} 
        onValueChange={(value) => handleResponseChange('value', value)}
        value={response.value}
        useSlider={true}
      />
      <Text style={SelfReflectionStyles.description}>(Perspective description here)</Text>
      <Text style={SelfReflectionStyles.askYourself}>Ask Yourself:</Text>
      <View style={SelfReflectionStyles.questionBox}>
        <Text style={SelfReflectionStyles.questionText}>Did you miss seeing the big picture and has this had a detrimental effect?</Text>
      </View>
      <View style={SelfReflectionStyles.buttonGroup}>
        <DefaultButton 
          containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, response.number === 1 && SelfReflectionStyles.selectedButton]} 
          text="1" 
          onTouch={() => handleResponseChange('number', 1)}
        />
        <DefaultButton 
          containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, response.number === 2 && SelfReflectionStyles.selectedButton]} 
          text="2" 
          onTouch={() => handleResponseChange('number', 2)}
        />
        <DefaultButton 
          containerStyle={[HalfButtonStyles.container, SelfReflectionStyles.button, response.number === 3 && SelfReflectionStyles.selectedButton]} 
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
