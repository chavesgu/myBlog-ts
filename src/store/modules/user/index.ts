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
  setUserInfo(state,{info}:State){
    state.info = info
  }
};


const test:Module<State,RootState> = {
  state,
  getters,
  mutations,
  actions
};

export default test;