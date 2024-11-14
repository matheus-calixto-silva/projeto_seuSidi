import axios from 'axios';

import { ILoggedUSerData } from '../interfaces/ILoggedUSerData';

const baseUrl = 'http://localhost:3000/login';

const login = async (credentials: ILoggedUSerData) => {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
};

export default { login };