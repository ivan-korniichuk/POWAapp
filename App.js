import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, BarChart, Slider, Help, Graph } from './screens/index';
import ScreenHeaderButton from './components/ScreenHeaderButton'; // Adjust the path as needed
import {COLORS} from './constants/index'
import { useFonts, JosefinSans_700Bold, JosefinSans_500Medium, JosefinSans_300Light } from '@expo-google-fonts/josefin-sans';
const Stack = createStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    JosefinSans_700Bold,
    JosefinSans_500Medium,
    JosefinSans_300Light,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
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
