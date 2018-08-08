import {Module,GetterTree,MutationTree} from 'vuex'
import {State} from './types'
import {RootState} from '../../types'
import actions from './Action'

const state = ():State=>{
  return{
    info:null,
    needUpdateInfo:true
  }
};

const getters:GetterTree<State,RootState> = {

};

const mutations:MutationTree<State> = {
  setUserInfo(state,{result}){
    state.info = result
  },
  setUpdateInfo(state,status){
    state.needUpdateInfo = status
  }
};


const user:Module<State,RootState> = {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
};

export default user;