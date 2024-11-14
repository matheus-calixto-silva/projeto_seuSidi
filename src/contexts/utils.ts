/* eslint-disable no-console */
import { ILoggedUSerData } from '../interfaces/ILoggedUSerData';
import userService from '../services/users';
import loginService from '../services/login'

export function addToken(token: string) {
    userService.setToken(token);
 
}

export function removeToken() {
  
    userService.setToken('');
}

export function setUserLocalStorage(user: ILoggedUSerData | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserLocalStorage() {
  localStorage.removeItem('user');
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('user');

  if (json) {
    const user = JSON.parse(json);
    return user ?? null;
  }

  return null;
}

export async function loginRequest(username: string, password: string) {
  try {
    const response = await loginService.login({ username, password });

    return response;
  } catch (error) {
    if (error instanceof Error) console.log(error)
      
    return null;
  }
}
