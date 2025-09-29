import { tryAuth, handleLogin, handleSignUp, addReportAPI, getReportsAPI, updateReportAPI, updateUser } from './apiService';
import { useData } from './storageService';
import { reportSchema } from './schemas';
import { useEffect, useRef } from 'react';

export const DataSyncManager = () => {
  const hasMountedOnline = useRef(false);
  const hasMountedAuth = useRef(false);
  const { 
    changeWidgetStatus,
    syncIntervalId,
    isAuthenticated,
    setIsAuthenticated,
    isOnline,
    setIsOnline,
    user,
    reports, 
    lastReport, 
    setNewUser, 
    loadUser, 
    addLocalReport, 
    setAllReports,
    updateLocalReport,
    updateJWT,
    loadReports,
    loadUserData,
    updateUserName,
    updateUserEmail,
  } = useData();

  const auth = async () => {
    const [loadedUser, loadedReports] = await loadUserData();

    if (loadedUser) {
      changeWidgetStatus('loading');
      const responce = await tryAuth(loadedUser.jwt);
      changeWidgetStatus('');

      if (responce && !responce.message) {
        const _id = responce._id;
        if (_id) {
          syncReports(loadedUser.jwt, loadedReports);
          setIsAuthenticated(true);
          setIsOnline(true);
          return true;
        }
      } else if (responce && responce.message) {
        setIsOnline(true);
        setIsAuthenticated(false);
        return false;
      } else if (!responce && loadedUser.jwt) {
        setIsOnline(false);
        setIsAuthenticated(true);
        return true;
      }
    }

    setIsOnline(false);
    setIsAuthenticated(false);
    return false;
  };

  useEffect(() => {
    syncAuth();
  }, [isOnline]);

  useEffect(() => {
    if (hasMountedAuth.current) {
      if (isAuthenticated) {
        startSyncingData();
      } else {
        stopSyncingData();
        logout();
      }
    } else {
      hasMountedAuth.current = true;
    }
  }, [isAuthenticated]);

  async function syncAuth() {
    if (hasMountedOnline.current) {
      if (isOnline) {
        const responce = await tryAuth(user.jwt);
        if (responce && responce.message) {
          await logout();
          return;
        }
        if (isAuthenticated && user.jwt !== '') {
          syncReports();
        }
      }
    } else {
      hasMountedOnline.current = true;
    }
  }

  const startSyncingData = () => {
    if (syncIntervalId.current === null) {
      syncIntervalId.current = setInterval(() => {
        syncAuth();
      }, 10000);
    }
  };
  
  const stopSyncingData = () => {
    if (syncIntervalId.current !== null) {
      clearInterval(syncIntervalId.current);
      syncIntervalId.current = null;
    }
  };
 
  const login = async (email, password) => {
    changeWidgetStatus('loading');
    const responce = await handleLogin(email, password);
    changeWidgetStatus('');
    const [loadedUser, loadedReports] = await loadUserData();
    if (responce && !responce.message) {
      if (loadedUser && loadedUser.email === responce.email) {
        await updateJWT(responce.jwt);
        await syncReports(responce.jwt, loadedReports);
      } else {
        await setNewUser(responce.username, responce.email, responce.jwt);
      }
      setIsAuthenticated(true);
      setIsOnline(true);
      return "";
    }
    setIsOnline(false);
    setIsAuthenticated(false);
    return typeof Object.hasOwn(responce.message, 'name') && responce.message.name === 'TypeError' ? 'Unable to connect to the server, please try again later.' : responce.message;
  };

  const logout = async () => {
    console.error('requires logout');
    await updateJWT('');
    setIsAuthenticated(false);
    stopSyncingData();
  };
  
  const signUp = async (username, email, password) => {
    changeWidgetStatus('loading');
    const responce = await handleSignUp(username, email, password);
    changeWidgetStatus('');
    if (responce && !responce.message) {
      await setNewUser(responce.username, responce.email, responce.jwt);
      setIsOnline(true);
      setIsAuthenticated(true);
      return '';
    }
    setIsOnline(false);
    setIsAuthenticated(false);
    return typeof Object.hasOwn(responce.message, 'name') && responce.message.name === 'TypeError' ? 'Unable to connect to the server, please try again later.' : responce.message;
  };

  const addReport = async (report) => {
    const newReport = {
      ...reportSchema,
      _id: -1,
      perspective: report.Perspective.value,
      other_centred: report.OtherCentred.value,
      willing_learn: report.WillingnessToLearn.value,
      self_assess: report.AccurateSelfAssessment.value,
      comment_perspective: report.Perspective.comment,
      comment_other_centred: report.OtherCentred.comment,
      comment_willing_learn: report.WillingnessToLearn.comment,
      comment_self_assess: report.AccurateSelfAssessment.comment,
      answer_perspective: report.Perspective.answer,
      answer_other_centred: report.OtherCentred.answer,
      answer_willing_learn: report.WillingnessToLearn.answer,
      answer_self_assess: report.AccurateSelfAssessment.answer,
      dateCreatedCli: new Date().toISOString(),
      dateModifiedCli: new Date().toISOString(),
    };

    const responce = await addReportAPI(user.jwt, newReport);
    const _id = responce ? responce._id : undefined;

    if (responce) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
    const updatedReport = _id ? {
      ...newReport,
      _id: _id
    } : newReport;

    await addLocalReport(updatedReport);
  };

  // overrides all reports!!! to be replaced
  const loadServerReports = async (jwt = user.jwt) => {
    const responce = await getReportsAPI(jwt);
    
    if (responce && !responce.message) {
      setIsOnline(true);
      await setAllReports(responce);
    } else if (responce.message) {
      setIsOnline(true);
      setIsAuthenticated(false);
    } else {
      setIsOnline(false);
    }
  };

  const updateExistingReport = async (updatedData) => {
    if (lastReport.dateCreatedCli === '') {
      console.error('Cannot update not existing report!');
      return;
    }

    const updatedReport = {
      ...lastReport,
      perspective: updatedData.Perspective.value,
      other_centred: updatedData.OtherCentred.value,
      willing_learn: updatedData.WillingnessToLearn.value,
      self_assess: updatedData.AccurateSelfAssessment.value,
      comment_perspective: updatedData.Perspective.comment,
      comment_other_centred: updatedData.OtherCentred.comment,
      comment_willing_learn: updatedData.WillingnessToLearn.comment,
      comment_self_assess: updatedData.AccurateSelfAssessment.comment,
      answer_perspective: updatedData.Perspective.answer,
      answer_other_centred: updatedData.OtherCentred.answer,
      answer_willing_learn: updatedData.WillingnessToLearn.answer,
      answer_self_assess: updatedData.AccurateSelfAssessment.answer,
      dateModifiedCli: new Date().toISOString(),
    };

    await updateLocalReport(updatedReport);
    if (updatedReport._id != '-1') {
      await updateReportAPI(user.jwt, updatedReport);
    }
  };

  const syncReports = async (jwt = user.jwt, getlocalReports = reports) => {
    const responceReports = await getReportsAPI(jwt);
    if (responceReports && !responceReports.message) {
      let localReports = getlocalReports;
      const serverReports = responceReports;
      const serverIDs = serverReports.map(report => report._id);
      localReports = localReports.filter(r => serverIDs.includes(r._id));

      for (let i = 0; i < localReports.length; i++) {
        const localReport = localReports[i];
        if (localReport._id === -1) {
          const responce = await addReportAPI(user.jwt, localReport);
          const _id = responce ? responce._id : undefined;
          if (_id) {
            localReports[i]._id = _id;
          } else {
            console.error('Error: sync report ' + localReports[i].dateCreatedCli);
          }
        }
      }

      const localIDs = localReports.map(report => report._id);

      serverReports.forEach(async serverReport => {
        if (!localIDs.includes(serverReport._id)) {
          localReports.push(serverReport);
        } else {
          console.log('serverReport.dateModifiedCli' + serverReport.dateModifiedCli);
          console.log('localReports.dateModifiedCli' + localReports[0].dateModifiedCli);
          const localReport = localReports.find(r => r._id == serverReport._id);
          
          if (serverReport.dateModifiedCli > localReport.dateModifiedCli) {
            // server has newer version, update local version
            localReports = localReports.filter(r => r._id != serverReport._id);
            localReports.push(serverReport);
          } else if (serverReport.dateModifiedCli < localReport.dateModifiedCli) {
            updateReportAPI(user.jwt, localReport);
          }
        }
      });
      
      await setAllReports(localReports);
    } else {
      setIsOnline(false);
      console.error(responceReports.message);
    }
  };

    const updateUserData = async (newUsername = undefined, newEmail = undefined, newPassword = undefined) => {
        const apiResponse = await updateUser(user.jwt, newUsername, newEmail, newPassword);
        if ('_id' in apiResponse) {
            setIsOnline(true);
            if (newUsername) {
                updateUserName(newUsername);
            }
            if (newEmail) {
                updateUserEmail(newEmail);
            }
            return "Successfully updated your account details.";
        }
        else if (apiResponse.message.name === "TypeError") {
            setIsOnline(false);
            return "Unable to connect to the server, please try again later."
        }
        else {
            console.error(apiResponse.message);
            return apiResponse.message;
        }
    }

  return {
    auth,
    login,
    logout,
    signUp,
    addReport,
    updateExistingReport,
    updateUserData,
  };
};
