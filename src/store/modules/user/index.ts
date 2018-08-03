import {Module,GetterTree,MutationTree} from 'vuex'
import {State} from './types'
import {RootState} from '../../types'
import actions from './Action'

const state = ():State=>{
  return{
    info:null
  }
};

const getters:GetterTree<State,RootState> = {

};

const mutations:MutationTree<State> = {
  setUserInfo(state,{result}){
    state.info = result
  }
};


const test:Module<State,RootState> = {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
};

export default test;