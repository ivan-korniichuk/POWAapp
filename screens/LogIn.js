import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DataSyncManager } from '../Storage/dataService';
import { DefaultButton } from '../components'
import { COLORS } from '../constants'

const Login = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { auth, login } = DataSyncManager();

  useEffect(() => {
    void handleAuth();
  }, []);

  async function handleAuth() {
    setIsAuthenticated(await auth());
  }

  async function handleLogin() {
    const response = await login(email, password);
    setIsAuthenticated(response === "");
    setErrorMessage(response);
  }

  function changeEmailInput(newEmail) {
    setEmail(newEmail);
    setErrorMessage("");
  }

  function changePasswordInput(newPassword) {
    setPassword(newPassword);
    setErrorMessage("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginText}>
        <Text style={styles.welcome}>
          Welcome Back
        </Text>
        <Text style={styles.credentials}>
          Enter your credentials to login
        </Text>
      </View>
      <View style={styles.inputBoxes}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={changeEmailInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={changePasswordInput}
          secureTextEntry
        />
        {errorMessage === '' ? null : <Text style={styles.error}>{errorMessage}</Text>}
        <DefaultButton containerStyle={styles.loginButton} text="Log In" onTouch={handleLogin} />
      </View>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('SignUp')}
      >
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
  },
  input: {
    width: 250,
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: `${COLORS.primary}20`,
  },
  link: {
    marginTop: 10,
    color: 'blue',
  },
  loginButton: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    width: 250,
  },
  error: {
    color: 'red',
    marginBottom: 15,
    width: 250,
  },
  welcome: {
    fontSize: 35,
    fontWeight: "600",
  },
  credentials: {
    fontSize: 13,
    marginBottom: 15,
  },
  loginText: {
    alignItems: 'center',
  },
  inputBoxes: {
    alignItems: 'center',
  },
});

export default Login;
