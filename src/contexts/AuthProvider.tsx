import { createContext, useEffect, useMemo, useState } from 'react';

import { IAuthProvider } from '../interfaces/IAuthProvider';
import  { IContext} from '../interfaces/IContext';
import  {IUser} from '../interfaces/IUser';
import useNavigation from '../libs/navegate';

import {
  addToken,
  getUserLocalStorage,
  loginRequest,
  removeToken,
  removeUserLocalStorage,
  setUserLocalStorage,
} from './utils';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();
  const navigate = useNavigation();

  useEffect(() => {
    const userLocalStorage = getUserLocalStorage();

    if (userLocalStorage) {
      setUser(userLocalStorage);
      addToken(userLocalStorage.token);
      navigate('/inicio');
    } else {
      navigate('/');
    }
  }, []);

  async function handleLogin(email: string, password: string) {
    const response = await loginRequest(email, password);

    setUser(response);
    addToken(response.token);

    setUserLocalStorage(response);
    navigate('/inicio');
  }

  function handleLogout() {
    setUser(null);
    if (user?.email) removeToken();
    removeUserLocalStorage();
    navigate('/');
  }

  const contextValue = useMemo(
    () => ({
      ...user,
      handleLogin,
      handleLogout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};