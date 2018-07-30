import {ActionTree,ActionContext} from 'vuex'
import {State} from "./types";
import {RootState} from "@/store/types";
import * as User from '@/services/user';
import {
  Login,
  Register,
  OldChangePass,
  PhoneChangePass,
  UpdateUserInfo
} from '@/services/types'

const actions:ActionTree<State,RootState> = {
  async login({commit}:ActionContext<State,RootState>,opt:Login){
    return User.USER_LOGIN(opt);
  },

  async register({commit},opt:Register){
    return User.USER_REGISTER(opt);
  },

  async getUserInfo({commit}){
    let data = await User.GET_INFO();
    commit('setUserInfo',data)
  },

  async saveUserInfo({commit},opt:UpdateUserInfo){
    return User.UPDATE_INFO(opt);
  },

  async phoneCode({},phone:number){
    return User.PHONE_CODE(phone);
  },

  async phoneChangePassCode({}){
    return User.PHONE_CHANGE_PASS_CODE();
  },

  async emailChangePassCode({}){
    return User.EMAIL_CHANGE_PASS_CODE();
  },

  async phoneChangePass({},opt:PhoneChangePass){
    return User.PHONE_CHANGE_PASS(opt);
  },

  async oldChangePass({commit},opt:OldChangePass){
    return User.OLD_CHANGE_PASS(opt);
  },

  async qiniuToken({},filename?:string){
    return User.QINIU_TOKEN(filename);
  }
};

export default actions