export type TRole = 'admin' | 'user'; 

export interface IAdminSchema {
  fullname: string;
  username: string;
  password: string;
}
