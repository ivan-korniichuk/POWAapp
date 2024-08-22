import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.sectionHeader}>
    Account Information
    </Text>
      <Text style={styles.paragraph}>
        Your self-evaluations can be seen by users with an admin account. This allows for progress to be tracked for research into the POWA concept.
      </Text>
      <Text style={styles.paragraph}>
      All self-reflection data is anonymous, and only you can see the notes you made about any given coaching session.
      </Text>
      <Text style={styles.paragraph}>
      For more information on the POWA model for person-centred coaching, see the POWA model help page.
      </Text>
      <View style={styles.button}>
          <Button  
          title="Continue"
          color = "#02077E"
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 8,
  },
  paragraph: {
    margin: 18,
    fontSize: 14,
    textAlign: 'center',
  },
  sectionHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'top',
    marginVertical: 10,
    color : "#FFFFFF",
    fontSize : 18,
    paddingVertical : 10,
    backgroundColor : "#02077E",
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
});
