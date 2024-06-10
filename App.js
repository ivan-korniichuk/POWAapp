import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, BarChart, SelfReflection, Help, Graph } from './screens/index';
import ScreenHeaderButton from './components/ScreenHeaderButton'; // Adjust the path as needed
import {COLORS} from './constants/index'
import { useFonts, JosefinSans_700Bold, JosefinSans_500Medium, JosefinSans_300Light, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';

const Stack = createStackNavigator();

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
        <Stack.Screen name="SelfReflection" component={SelfReflection} />
        <Stack.Screen name="BarChart" component={BarChart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// import { Home, BarChart, SelfReflection, Help, Graph } from './screens/index';
// // import ScreenHeaderButton from './components/ScreenHeaderButton';
// import {COLORS} from './constants/index'
// import { useFonts, JosefinSans_700Bold, JosefinSans_500Medium, JosefinSans_300Light } from '@expo-google-fonts/josefin-sans';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// // import { Button } from 'react-native-elements';

// const Drawer = createDrawerNavigator();
// const DrawerNavigator = ({ navigation }) => {
//   return (
//     <Drawer.Navigator
//     initialRouteName="Home"
//       screenOptions={({ navigation }) => ({
//         headerShadowVisible: false,
//         headerStyle: {
//           backgroundColor: COLORS.primary,
//         },
//         headerTintColor: '#ffffff',
//       })}
//       >
//         <Drawer.Screen name="Home" component={Home} />
//           <Drawer.Screen name="Help" component={Help} />
//           <Drawer.Screen name="Graph" component={Graph} />
//           <Drawer.Screen name="SelfReflection" component={SelfReflection} />
//           <Drawer.Screen name="BarChart" component={BarChart} />
//       </Drawer.Navigator>
//   );
// };



// const App = () => {
//   let [fontsLoaded] = useFonts({
//     JosefinSans_700Bold,
//     JosefinSans_500Medium,
//     JosefinSans_300Light,
//   });
//   return (
//     <NavigationContainer>
//       <DrawerNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;
