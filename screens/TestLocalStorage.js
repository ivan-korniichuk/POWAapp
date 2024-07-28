import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useData } from '../Storage/storageService';

const TestLocalStorage = ({ navigation }) => {
  const { user, loadUser, deleteUserData} = useData();
    
    return (
      <View style={{ padding: 20 }}>
        <Text>Name:</Text>
        <TextInput
          value={user.username}
          onChangeText={(text) => updateUserName(text, false)}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
        <Text>Email:</Text>
        <TextInput
          value={user.email}
          onChangeText={(text) => updateUserEmail(text, false)}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
        <Text>JWT:</Text>
        <TextInput
          value={user.jwt}
          onChangeText={(text) => {value = text}}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
        <Button title="Load User" onPress={loadUser} />
        <Button title="Delete All Info" onPress={deleteUserData} />
      </View>
    );
};

export default TestLocalStorage;