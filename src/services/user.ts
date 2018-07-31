import api from '../utils/api'
import {Register,Login,OldChangePass,PhoneChangePass,UpdateUserInfo} from './types'

export const PHONE_CODE = (phone:number) => {
  return api.post('/phoneCode',{phone})
};//手机注册验证码

export const USER_REGISTER = ({user,password,email,phone,code}:Register) => {
  return api.post('/register',{
    user,password,email,phone,code
  })
};//注册接口

export const USER_LOGIN = ({user,password}:Login) => {
  return api.post('/signIn',{user,password});
};//登录接口

export const GET_INFO = () => {
  return api.get('/getUserInfo');
};//获取用户信息接口

export const UPDATE_INFO = (opt:UpdateUserInfo) =>{
  return api.patch('/user/info',{...opt});
};//修改更新用户信息

export const PHONE_CHANGE_PASS_CODE = () =>{
  return api.post('/user/changePassPhoneCode')
};//手机修改密码验证码

export const EMAIL_CHANGE_PASS_CODE = () =>{
  return api.post('/user/changePassEmailCode')
};//邮箱修改密码验证码

export const PHONE_CHANGE_PASS = ({newPass,code}:PhoneChangePass) =>{
  return api.patch('/user/phoneChangePass',{newPass,code})
};

export const OLD_CHANGE_PASS = ({oldPass,newPass}:OldChangePass) => {
  return api.patch('/user/oldChangePass',{oldPass,newPass})
};//原密码修改密码接口


export const QINIU_TOKEN = (filename?:string) =>{
  return api.post('/user/qiniu',{filename})
};//获取上传头像权限