import {ActionTree,ActionContext} from 'vuex'
import {State} from "./types";
import {RootState} from "@/store/types";
import * as User from '@/services/user';
import myCookie from '@/utils/cookie'
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
    try {
      let data:any = await User.GET_INFO();
      commit('setUpdateInfo',false);
      commit('setUserInfo',data);
      return data
    }catch (e) {
      return e
    }
  },

  async saveUserInfo({commit},opt:UpdateUserInfo){
    try {
      let data:any = await User.UPDATE_INFO(opt);
      commit('setUpdateInfo',true);
      return data
    }catch (e) {
      return e
    }
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

  async qiniuToken({},filename:string = myCookie.getItem('user')+'.jpg'){
    return User.QINIU_TOKEN(filename);
  }
};

export default actions