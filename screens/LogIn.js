import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DataSyncManager } from '../Storage/dataService';
import { DefaultButton } from '../components'

const Login = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { auth, login } = DataSyncManager();

  useEffect(() => {
    handleAuth();
  }, []);

  async function handleAuth() {
    setIsAuthenticated(await auth());
  }

  async function handleLogin() {
    setIsAuthenticated(await login(email, password));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
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
});

export default Login;
