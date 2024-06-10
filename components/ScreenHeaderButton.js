// import { Menu } from 'react-native-feather';
// import { TouchableOpacity } from 'react-native';

// const ScreenHeaderButton = ({navigation}) => {
//     return (
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//             <Menu color='#ffffff'/>
//         </TouchableOpacity>
//     )
// }

// export default ScreenHeaderButton

import React from 'react';
import { Menu } from 'react-native-feather';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

const ScreenHeaderButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Menu color='#ffffff' />
    </TouchableOpacity>
  );
}

export default ScreenHeaderButton;