import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DataSyncManager } from '../Storage/dataService';
import { DefaultButton } from '../components/index'

const SignIn = ({ navigation, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { signUp } = DataSyncManager();

  async function handleSignUp() {
    const message = await signUp(username, email, password);
    setIsAuthenticated(message === "");
    setErrorMessage(message);
  }

  function editName(newName) {
    setUsername(newName);
    setErrorMessage("");
  }

  function editEmail(newEmail) {
    setEmail(newEmail);
    setErrorMessage("");
  }

  function editPassword(newPassword) {
    setPassword(newPassword);
    setErrorMessage("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={username}
        onChangeText={editName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={editEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={editPassword}
        secureTextEntry
      />
      {errorMessage === "" ? null : <Text style={styles.error}>{errorMessage}</Text>}
      <DefaultButton containerStyle={styles.signUpButton} text="Sign Up" onTouch={handleSignUp} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Log in
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  link: {
    marginTop: 10,
    color: 'blue',
  },
  signUpButton: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  error: {
    color: 'red',
    width: '75%',
    marginBottom: 20,
  },
});

export default SignIn;
