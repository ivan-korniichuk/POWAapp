import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, BarChart, SelfReflection, Help, Graph, Login, SignUp, Calendar, AccountInfo } from './screens/index';
import { COLORS } from './constants/index';
import { useFonts, JosefinSans_700Bold, JosefinSans_500Medium, JosefinSans_300Light, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { DataProvider, useData } from './storage/storageService';
import { CustomWidget } from './components/index';

const Stack = createStackNavigator();
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
    <Drawer.Screen name="Home" component={Home} options={{ title: 'The POWA Model' }} />
    <Drawer.Screen
        name="SelfReflection"
        component={SelfReflection}
        options={{ headerLeft: () => null, gestureEnabled: false, swipeEnabled:false, title: 'Self-Reflection' }}
    />
    <Drawer.Screen name="Graph" component={Graph} options={{ title: 'Track My Progress' }} />
    <Drawer.Screen name="BarChart" component={BarChart} options={{ title: 'My Statistics' }} />
    <Drawer.Screen name="Calendar" component={Calendar} />
    <Drawer.Screen name="Help" component={Help} />
    <Drawer.Screen name="AccountInfo" component={AccountInfo} options={{ title: 'My Account' }} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, widgedStatus, widgedVisible } = useData();

  return (
  <>
    <CustomWidget visible={widgedVisible} status={widgedStatus} />
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
            {props => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {props => <SignUp {...props} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  </>
)};

const App = () => {
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
        <AppNavigator />
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
