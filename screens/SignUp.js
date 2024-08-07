import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DataSyncManager } from '../Storage/dataService';
import { DefaultButton } from '../components/index'
import { COLORS } from '../constants'

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
      <View style={styles.signUpText}>
        <Text style={styles.signIn}>
          Sign Up
        </Text>
        <Text style={styles.createText}>
          Create your account
        </Text>
      </View>
      <View style={styles.inputBoxes}>
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
          passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: special;"
        />
        {errorMessage === "" ? null : <Text style={styles.error}>{errorMessage}</Text>}
        <DefaultButton containerStyle={styles.signUpButton} text="Sign Up" onTouch={handleSignUp} />
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 100
  },
  input: {
    width: 235,
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: `${COLORS.primary}20`
  },
  link: {
    marginTop: 10,
    color: 'blue',
  },
  signUpButton: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    width: 235,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    width: 235,
  },
  signUpText: {
    alignItems: "center"
  },
  signIn: {
    fontSize: 40,
    fontWeight: "bold"
  },
  createText: {
    fontSize: 15
  },
  inputBoxes: {
    alignItems: "center",
  }
});

export default SignIn;
