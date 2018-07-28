import {ActionTree,ActionContext} from 'vuex'
import {State,Login} from "./types";
import {RootState} from "@/store/types";
import * as User from '@/services/user';

const actions:ActionTree<State,RootState> = {
  async login({commit}:ActionContext<State,RootState>,{user,password}:Login){
    let res = await User.USER_LOGIN(user,password);
    console.log(res)
  }
};

export default actions