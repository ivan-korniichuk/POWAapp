import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DataSyncManager } from '../Storage/dataService';
import { DefaultButton } from '../components'

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
  loginButton: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  }
});

export default Login;
