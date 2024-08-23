import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userSchema, reportSchema } from './schemas';
import { USER_KEY, REPORTS_KEY } from '@env';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(userSchema);
  const [reports, setReports] = useState([]);
  const [lastReport, setLastReport] = useState(reportSchema);

  const saveUserData = async (userData) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem(USER_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to save the user data.', e);
    }
  };

  const saveReportsData = async (reports) => {
    try {
      const jsonValue = JSON.stringify(reports);
      await AsyncStorage.setItem(REPORTS_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to save reports.', e);
    }
  };

  const setNewUser = async (username, email, jwt) => {
    await deleteUserData();
    const userData = {
      ...userSchema,
      username: username,
      email: email,
      jwt: jwt
    };
    setUser(userData);
    await saveUserData(userData);
  };

  const loadUserData = async () => {
    const loadedUser = await loadUser();
    const loadedReports = await loadReports();
    return {loadedUser, loadedReports};
  }

  const loadUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_KEY);
      if (jsonValue != null) {
        setUser(JSON.parse(jsonValue));
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      console.error('Failed to load the user.', e);
      return { message: 'Failed to load the user.' };
    }
  };

  const loadReports = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(REPORTS_KEY);
      if (jsonValue != null) {
        setReports(JSON.parse(jsonValue));
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      console.error('Failed to load reports.', e);
      return { message: 'Failed to load reports.' };
    }
  };

  const deleteUserData = async () => {
    await deleteUser();
    await deleteReports();
  };

  const deleteUser = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      setUser(userSchema);
    } catch (e) {
      console.error('Failed to delete the user data.', e);
    }
  };

  const deleteReports = async () => {
    try {
      await AsyncStorage.removeItem(REPORTS_KEY);
      setUser(userSchema);
    } catch (e) {
      console.error('Failed to delete reports.', e);
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

  // this overrides current reports!!!
  const setAllReports = async (newReports) => {
    if (newReports.length <= 0) {
      console.error('there are no reports');
      return;
    }

    try {
      setReports(newReports);

      await saveReportsData(newReports);
    } catch (e) {
      console.error('Failed to set reports.', e);
    }
  };

  const addLocalReport = async (newReport) => {
    updatedReports = [...reports, newReport];
    try {
      setReports(updatedReports);
      await saveReportsData(updatedReports);
      setLastReport(newReport);
    } catch (e) {
      console.error('Failed to add new report.', e);
    }
  };

  const updateLocalReport = async (updatedReport) => {
    const updatedReports = reports.map((report) => 
      report.dateCreatedCli === updatedReport.dateCreatedCli
        ? { ...report, ...updatedReport }
        : report
    );

    try {
      setReports(updatedReports);
      await saveReportsData(updatedReports);
      setLastReport(updatedReport);
    } catch (e) {
      console.error('Failed to update report.', e);
    }
  };

  return (
    <DataContext.Provider value={{ 
        user, 
        reports,
        lastReport, 
        setNewUser, 
        deleteUserData, 
        loadUser, 
        updateJWT, 
        updateUserName, 
        updateUserEmail,
        updateLocalReport,
        addLocalReport,
        setAllReports
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
