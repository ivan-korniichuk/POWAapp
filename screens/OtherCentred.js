import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { DefaultButton, CustomSlider } from '../components/index';
import { SelfReflectionStyles, HalfButtonStyles, BarChartStyles } from '../styles/index.style';

const OtherCentred = ({navigation}) => {
  const [perspective, setPerspective] = useState(0);
  const [reflection, setReflection] = useState('');
  const [answer, setAnswer] = useState("unsure");

  return (
      <View style={BarChartStyles.container}>
        <ScrollView style={SelfReflectionStyles.container}>
        <CustomSlider 
          mainLabel={"Other-centred"} leftLabel={"Self-serving"} 
          rightLabel={"Servile"} onValueChange={setPerspective}
          useSlider={true}
        />
        <Text style={SelfReflectionStyles.description}>(Other-centred description here)</Text>
        <Text style={SelfReflectionStyles.askYourself}>Ask Yourself:</Text>
        <View style={SelfReflectionStyles.questionBox}>
          <Text style={SelfReflectionStyles.questionText}>Were your actions convenient for you but perhaps less relevant to the needs of others?</Text>
        </View>
        <View style={SelfReflectionStyles.buttonGroup}>
          <DefaultButton containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, answer === "yes" && SelfReflectionStyles.selectedButton]} text="Yes" onTouch={() => setAnswer("yes")}/>
          <DefaultButton containerStyle={[HalfButtonStyles.container, {marginRight: 20}, SelfReflectionStyles.button, answer === "unsure" && SelfReflectionStyles.selectedButton]} text="Unsure" onTouch={() => setAnswer("unsure")}/>
          <DefaultButton containerStyle={[HalfButtonStyles.container, SelfReflectionStyles.button, answer === "no" && SelfReflectionStyles.selectedButton]} text="No" onTouch={() => setAnswer("no")}/>
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
          <DefaultButton containerStyle={[HalfButtonStyles.container, {marginRight: 20}]} text="Back" onTouch={() => navigation.navigate("The POWA Model")}/>
            
          <DefaultButton containerStyle={HalfButtonStyles.container} text="Next"/>
        </View>
      </View>
  );
};

export default OtherCentred;