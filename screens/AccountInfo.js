import React from 'react';
import { View } from 'react-native';
import { DataSyncManager } from '../storage/dataService';
import { DefaultButton } from '../components'

const AccountInfo = ({ navigation }) => {
  const { logout } = DataSyncManager();

  async function handleLogout() {
    logout();
  }

  return (
    <View>
      <DefaultButton text="Logout" onTouch={handleLogout} />
    </View>
  );
};

export default AccountInfo;
