import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userSchema, reportSchema } from './schemas';
import { USER_KEY, REPORTS_KEY } from '@env';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(userSchema);
  const [widgedStatus, setWidgetStatus] = useState('');
  const [widgedVisible, setWidgetVisible] = useState(false);
  const [reports, setReports] = useState([]);
  const [lastReport, setLastReport] = useState(reportSchema);
  const [isOnline, setOnline] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const syncIntervalId = useRef(null);

  useEffect(() => {
    console.log('Is online: ' + isOnline);
    // if (isOnline) {
    //   changeWidgetStatus('online');
    // } else {
    //   changeWidgetStatus('offline');
    // }
  }, [isOnline]);

  const changeWidgetStatus = (newStatus) => {
    console.log('newStatus' + newStatus);

    if (newStatus === 'online' || newStatus === 'offline') {
      setWidgetStatus(newStatus);
      setWidgetVisible(true);
      setTimeout(() => {
        if (widgedStatus === 'online' || widgedStatus === 'offline') {
          setWidgetVisible(false);
        }
      }, 1500);
    } else if (newStatus === 'loading') {
      setWidgetStatus('loading');
      setWidgetVisible(true);
    } else {
      setWidgetVisible(false);
    }
  }

  const saveUserData = async (userData) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem(USER_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to save the user data.', e);
    }
  };

  const setIsAuthenticated = (newVal) => {
    if (newVal != isAuthenticated) {
      setAuthenticated(newVal)
    }
  };

  const setIsOnline = (newVal) => {
    if (newVal != isOnline) {
      setOnline(newVal);
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
      return [];
    } catch (e) {
      console.error('Failed to load reports.', e);
      return { message: 'Failed to load reports.' };
    }
  };

  const loadUserData = async () => {
    return [await loadUser(), await loadReports()];
  }

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
      setReports([]);
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

  const updateUserName = (username = null, saveData = true) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, username: username };
      saveData && saveUserData(updatedUser);
      return updatedUser;
    });
  };

  const updateUserEmail = (email = null, saveData = true) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, email: email };
      saveData && saveUserData(updatedUser);
      return updatedUser;
    });
  };

  // this overrides current reports!!!
  const setAllReports = async (newReports) => {
    if (reports.length === 0 && newReports.length === 0) {
      console.log('no changes needed');
      return;
    } else if (newReports.length === 0) {
      console.log('there are no reports');
      deleteReports();
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
        widgedStatus,
        widgedVisible,
        changeWidgetStatus,
        syncIntervalId,
        isOnline,
        setIsOnline,
        isAuthenticated,
        setIsAuthenticated,
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
        setAllReports,
        loadReports,
        loadUserData,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
