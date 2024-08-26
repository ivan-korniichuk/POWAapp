import { tryAuth, handleLogin, handleSignUp, addReportAPI, getReportsAPI, updateReportAPI } from './apiService';
import { useData } from './storageService';
import { reportSchema } from './schemas';
import { useEffect, useRef } from 'react';

export const DataSyncManager = () => {
  const hasMountedOnline = useRef(false);
  const hasMountedAuth = useRef(false);
  const { 
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
  } = useData();

  const auth = async () => {
    const loadedUser = await loadUser();
    if (loadedUser) {
      const responce = await tryAuth(loadedUser.jwt);
      if (responce && !responce.message) {
        const _id = responce._id;
        if (_id) {
          // await loadServerReports(loadedUser.jwt);
          syncReports(loadedUser.jwt);
          setIsAuthenticated(true);
          setIsOnline(true);
          return true;
        }
      } else if (loadedUser.jwt) {
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
    onOnline();
  }, [isOnline]);

  useEffect(() => {
    if (hasMountedAuth.current) {
      console.log('isAuthenticated: ' + isAuthenticated);
      if (!isAuthenticated) {
        logout();
      }
    } else {
      hasMountedAuth.current = true;
    }
  }, [isAuthenticated]);

  async function onOnline() {
    if (hasMountedOnline.current) {
      if (isOnline) {
        const responce = await tryAuth(user.jwt);
        console.log('on online')
        console.log(responce)
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
 
  const login = async (email, password) => {
    const responce = await handleLogin(email, password);
    const loadedUser = await loadUser();
    if (responce && !responce.message) {
      if (loadedUser && loadedUser.email === responce.email) {
        await updateJWT(responce.jwt);
        await syncReports(responce.jwt);
      } else {
        // const reports = await getReportsAPI(responce.jwt);
        await setNewUser(responce.username, responce.email, responce.jwt);
        // await setAllReports(reports);
        await syncReports(responce.jwt);
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
  };
  
  const signUp = async (username, email, password) => {
    const responce = await handleSignUp(username, email, password);
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
    };

    const responce = await addReportAPI(user.jwt, newReport);
    const _id = responce ? responce._id : undefined;
    console.log('responce add' + responce)
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

  // overrides all reports!!!
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
    };

    await updateLocalReport(updatedReport);
    if (updatedReport._id != '-1') {
      await updateReportAPI(user.jwt, updatedReport);
    }
  };

  const syncReports = async (jwt = user.jwt) => {
    console.log('sync start');
    const responceReports = await getReportsAPI(jwt);
    if (responceReports && !responceReports.message) {
      let localReports = reports;
      const serverReports = responceReports;
      // 
      console.log('local')
      console.log(localReports)
      // 
      console.log('server')
      console.log(serverReports)
      // 

      for (let i = 0; i < localReports.length; i++) {
        const localReport = localReports[i];
        if (localReport._id === -1) {
          const responce = await addReportAPI(user.jwt, localReport);
          const _id = responce ? responce._id : undefined;
          if (_id) {
            localReports[i]._id = _id;
          } else {
            console.log('Error: sync report ' + localReports[i].dateCreatedCli);
          }
        }
      }

      const localDates = localReports.map(report => report.dateCreatedCli);

      serverReports.forEach(serverReport => {
        if (!localDates.includes(serverReport.dateCreatedCli)) {
          localReports.push(serverReport);
        }
      });

      // 
      console.log('updated local')
      console.log(localReports)
      // 
      
      await setAllReports(localReports);
      console.log('sync end');
    } else {
      setIsOnline(false);
      console.error(responceReports.message);
    }
  };

  return {
    auth,
    login,
    signUp,
    addReport,
    updateExistingReport,
  };
};
