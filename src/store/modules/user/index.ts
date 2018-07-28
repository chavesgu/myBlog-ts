import {Module,GetterTree,MutationTree} from 'vuex'
import {State} from './types'
import {RootState} from '../../types'
import actions from './Action'

const state = ():State=>{
  return{
    msg:333
  }
};

const getters:GetterTree<State,RootState> = {

};

const mutations:MutationTree<State> = {
  test(state,res:string){
    console.log(res)
  }
};


const test:Module<State,RootState> = {
  state,
  getters,
  mutations,
  actions
};

export default test;