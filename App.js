import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, BarChart, SelfReflection, Help, Graph, Login, SignUp } from './screens/index';
import { COLORS } from './constants/index';

import { useFonts, JosefinSans_700Bold, JosefinSans_500Medium, JosefinSans_300Light, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { DataProvider } from './Storage/storageService';

const Drawer = createDrawerNavigator();

const AuthenticatedDrawer = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#ffffff',
    }}
  >
    <Drawer.Screen name="The POWA Model" component={Home} />
    <Drawer.Screen name="Help" component={Help} />
    <Drawer.Screen name="Graph" component={Graph} />
    <Drawer.Screen name="SelfReflection" component={SelfReflection} />
    <Drawer.Screen name="BarChart" component={BarChart} />
  </Drawer.Navigator>
);

const AppNavigator = ({ isAuthenticated,  setIsAuthenticated}) => (
  <Stack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#ffffff',
    }}
  >
    {isAuthenticated ? (
      <>
        <Stack.Screen name="App" component={AuthenticatedDrawer} options={{ headerShown: false }} />
      </>
    ) : (
      <>
        <Stack.Screen name="Login">
          {props => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {props => <SignUp {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
      </>
    )}
  </Stack.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual authentication logic

  let [fontsLoaded] = useFonts({
    JosefinSans_300Light,
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <DataProvider>
      <NavigationContainer>
        <AppNavigator isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
