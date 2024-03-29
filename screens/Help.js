import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Help = ({ navigation }) => {
const handleButtonPress = () => {
    // Handle button press logic here
    console.log('Button pressed');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Powa Model Help</Text>
      </View>
      <ScrollView>
      
      <Text style={styles.subTitle}>
        Introduction:
      </Text>
      
      <Text style={styles.info}>
        This video explains the POWA model for person-centered coaching:
      </Text>
      
      <TouchableOpacity style={styles.vidButton} onPress={handleButtonPress}>
          <Text style={styles.vidButtonText}>More Videos</Text>
        </TouchableOpacity>
      
      <Text style={styles.info}>
        POWA Diagram:
      </Text>
      
      <Text style={styles.info}>
      </Text>
      <Text style={styles.subTitle}>
        Tips:
      </Text>
      
      <Text style={styles.info}>
        Advice from Paul
      </Text>
      
      <Text style={styles.info}>
      </Text>
      <Text style={styles.subTitle}>
        Using the App:
      </Text>

        <Text style={styles.info}>
        To rate your performance open the Self-Reflection page and navigate through the features of the POWA model using the arrow buttons.
      </Text>

      <Text style={styles.info}>
        On each page, there is a prompt question to help you to reflect on why you have rated youreself the way you have, and whether the rating is accurate. You can select a response to the question for advice on how to adjust your rating. It is also possible to disable prompt questions in the app settings.
      </Text>
      
      <Text style={styles.info}>
        Your self-reflection will correspond to the sliders on the home page; if you believe that you are deficient in a particular attribute, the scale will be towards the "-" end of the scale, while "+" denotes excess.
      </Text>

      <Text style={styles.info}>
        You can view your progress in different attributes on a graph over various time periods in the "My Progress" page.
      </Text>

      <Text style={styles.info}>
        The "My Statistics" page shows a bar chart of your average deficiency or excess in each POWA feature.
      </Text>
      
      <Text style={styles.info}>
      </Text>
      <Text style={styles.subTitle}>
        Permissions:
      </Text>
      
      <Text style={styles.info}>
        Data in this app is collected for research purposes. By using this app, you are contributing to research into the use of the POWA model to encourage person-centered coaching.                                     - Thank you!
      </Text>


      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#02077E',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    padding: 10,
    allignment: 'left',
  },
  footer: {
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    backgroundColor: 'white',
    padding: 10.
  },
  subTitle: {
    color: '#02077E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    padding: 10.
  },
button: {
    backgroundColor: '#02077E',
    textAlign: 'center',
    padding: 1,
    borderRadius: 5,
    width: 200,
    allignment: 'center',
  },
buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    padding: 5.
  },
vidButton: {
    backgroundColor: '#02077E',
    textAlign: 'center',
    padding: 1,
    borderRadius: 5,
    width: 200,
    allignment: 'center',
  },
vidButtonText: {
    color: 'white',
    textAlign: 'center',
    padding: 3.
  },
});

export default Help;