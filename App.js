import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, BarChart, Slider, Help, Graph } from './screens/index';
import ScreenHeaderButton from './components/ScreenHeaderButton'; // Adjust the path as needed

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#02077E',
          },
          headerTintColor: '#ffffff',
          headerRight: () => <ScreenHeaderButton navigation={navigation}/>
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Graph" component={Graph} />
        <Stack.Screen name="Slider" component={Slider} />
        <Stack.Screen name="BarChart" component={BarChart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
