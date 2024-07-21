import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, BarChart, SelfReflection, Help, Graph } from './screens/index';
import ScreenHeaderButton from './components/ScreenHeaderButton'; // Adjust the path as needed
import {COLORS} from './constants/index'
import { useFonts, JosefinSans_700Bold, JosefinSans_500Medium, JosefinSans_300Light, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator
    initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#ffffff',
      })}
      >
        <Drawer.Screen name="The POWA Model" component={Home} />
        <Drawer.Screen name="Help" component={Help} />
        <Drawer.Screen name="Graph" component={Graph} />
        <Drawer.Screen name="SelfReflection" component={SelfReflection} />
        <Drawer.Screen name="BarChart" component={BarChart} />
      </Drawer.Navigator>
  );
};

const App = () => {
  let [fontsLoaded] = useFonts({
    JosefinSans_300Light,
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    // Fonts are still loading, return a loading indicator or null
    return null;
  }

  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
};

export default App;
