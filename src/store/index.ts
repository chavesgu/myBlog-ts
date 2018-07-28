import Vue from 'vue'
import Vuex,{StoreOptions} from 'vuex'
import {RootState} from './types'

Vue.use(Vuex)

const files = require.context('@/store/modules/', true, /^\.\/.*\/index\.ts$/);
const filenames = files.keys();

let modules:any = {};// 最终modules对象
for (let val of filenames){ // 遍历store下获取到的文件
  let res = files(val);// 获取文件里面的输出内容
  let moduleVal:any = {};
  moduleVal.namespaced = true;
  let name:string = val.replace(/^\.\//, '').replace(/\.ts$/, '').split('/')[0];// 截取name
  modules[name] = Object.assign(moduleVal, res.default);
}

const option:StoreOptions<RootState> = {
  state: {
    version: '1.0',
    globalLoad: false
  },
  mutations: {
    loadingStart(state:RootState){
      state.globalLoad = true;
    },
    loadingOver(state:RootState){
      state.globalLoad = false;
    }
  },
  actions: {

  },
  strict: process.env.NODE_ENV==="development",
  modules
};

export default new Vuex.Store<RootState>(option)
