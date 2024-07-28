import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userSchema } from './Schemas';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(userSchema);

  const STORAGE_KEY = '@test';

  useEffect(() => {
    loadUser();
  }, []);

  const saveUserData = async (userData) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to save the user data.', e);
    }
  };

  const setNewUser = async (username, email, jwt) => {
    await deleteUserData();
    const userData = {
      username: username,
      email: email,
      jwt: jwt,
    };
    setUser(userData);
    await saveUserData(userData);
  };

  const loadUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setUser(JSON.parse(jsonValue));
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      console.error('Failed to load the user.', e);
    }
  };

  const deleteUserData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(userSchema);
    } catch (e) {
      console.error('Failed to delete the user data.', e);
    }
  };

  const updateJWT = async (newJWT, saveData = true) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, jwt: newJWT };
      saveData && saveUserData(updatedUser);
      return updatedUser;
    });
  };

  const updateUserName = async (username = null, saveData = true) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, username: username };
      saveData && saveUserData(updatedUser);
      return updatedUser;
    });
  };

  const updateUserEmail = async (email = null, saveData = true) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, email: email };
      saveData && saveUserData(updatedUser);
      return updatedUser;
    });
  };

  return (
    <DataContext.Provider value={{ user, setNewUser, deleteUserData, loadUser, updateJWT, updateUserName, updateUserEmail }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
