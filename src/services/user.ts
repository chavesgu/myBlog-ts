import api from '../utils/api'

export const USER_LOGIN = (user:string,password:string) => {
  return api.post('/login',{user,password});
};

export const GET_INFO = () => {
  return api.get('/getUserInfo');
};