export interface IUserToken {
  user: {
    id: string;
    name: string;
    email: string;
  };
  exp: number;
}