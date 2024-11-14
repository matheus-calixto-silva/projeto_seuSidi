import { ILoggedUSerData } from "./ILoggedUSerData";

  export interface IContext extends ILoggedUSerData {
    handleLogin: (username: string, password: string) => Promise<void>;
    handleLogout: () => void;
  }