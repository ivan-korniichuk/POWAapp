import { tryAuth, handleLogin, handleSignUp } from './apiService';
import { useData } from './storageService';

export const DataSyncManager = () => {
  const { setNewUser, loadUser } = useData();

  const auth = async () => {
    const loadedUser = await loadUser();
    if (loadedUser) {
      const _id = await tryAuth(loadedUser.jwt);
      if (_id) {
        return true;
      }
    }
  
    return false;
  }
 
  const login = async (email, password) => {
    const responce = await handleLogin(email, password);
    if (responce) {
      await setNewUser(responce.username, responce.email, responce.jwt);
      return true;
    }
  
    return false;
  }
  
  const signUp = async (username, email, password) => {
    const responce = await handleSignUp(username, email, password);
    if (responce) {
      await setNewUser(responce.username, responce.email, responce.jwt);
      return true;
    }
  
    return false;
  }

  return {
    auth,
    login,
    signUp
  };
};
