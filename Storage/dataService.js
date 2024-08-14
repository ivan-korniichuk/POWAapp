import { tryAuth, handleLogin, handleSignUp, addReportAPI, getReportsAPI, updateReportAPI } from './apiService';
import { useData } from './storageService';
import { reportSchema } from './schemas';

export const DataSyncManager = () => {
  const { 
    user,
    reports, 
    lastReport, 
    setNewUser, 
    loadUser, 
    addLocalReport, 
    setAllReports,
    updateLocalReport,
  } = useData();

  const auth = async () => {
    const loadedUser = await loadUser();
    if (loadedUser) {
      const _id = await tryAuth(loadedUser.jwt);
      if (_id) {
        await loadServerReports(loadedUser.jwt);
        return true;
      }
    }
  
    return false;
  }
 
  const login = async (email, password) => {
    const responce = await handleLogin(email, password);
    if (!Object.hasOwn(responce, 'message')) {
      const reports = await getReportsAPI(responce.jwt)
      await setNewUser(responce.username, responce.email, responce.jwt);
      await setAllReports(reports);
      return "";
    }
    return typeof Object.hasOwn(responce.message, 'name') && responce.message.name === "TypeError" ? "Unable to connect to the server, please try again later." : responce.message;
  }
  
  const signUp = async (username, email, password) => {
    const responce = await handleSignUp(username, email, password);
    if (!Object.hasOwn(responce, 'message')) {
      await setNewUser(responce.username, responce.email, responce.jwt);
      return "";
    }
    return typeof Object.hasOwn(responce.message, 'name') && responce.message.name === "TypeError" ? "Unable to connect to the server, please try again later." : responce.message;
  }

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
      dateCreatedCli: new Date().toISOString(),
    };

    const _id = await addReportAPI(user.jwt, newReport);

    const updatedReport = _id ? {
      ...newReport,
      _id: _id
    } : newReport;

    await addLocalReport(updatedReport);
  }

  // overrides all reports!!!
  const loadServerReports = async (jwt = user.jwt) => {
    const reports = await getReportsAPI(jwt);
    await setAllReports(reports);
  }

  const updateExistingReport = async (updatedData) => {
    console.log(lastReport)
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
    };

    await updateLocalReport(updatedReport);
    if (updatedReport._id != '-1') {
      await updateReportAPI(user.jwt, updatedReport);
    }
  }

  return {
    auth,
    login,
    signUp,
    addReport,
    updateExistingReport,
  };
};
