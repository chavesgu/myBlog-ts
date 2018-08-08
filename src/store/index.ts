import Vue from 'vue'
import Vuex,{StoreOptions} from 'vuex'
import {RootState} from './types'
// import user from './modules/user/'


const files = require.context('@/store/modules/', true, /^\.\/.*\/index\.ts$/);
const filenames = files.keys();

let modules:any = {};// 最终modules对象
for (let val of filenames){ // 遍历store下获取到的文件
  let res = files(val);// 获取文件里面的输出内容
  let moduleVal:any = {};
  let name:string = val.replace(/^\.\//, '').replace(/\.ts$/, '').split('/')[0];// 截取name
  modules[name] = Object.assign(moduleVal, res.default);
}

const option:StoreOptions<RootState> = {
  state: {
    version: '1.0',
    globalLoad: false,
    articleBgList: [`#72616e`, `#e8846b`, `#16528e`, `#e54b4b`, `#a2c5bf`, `#167c80`, `#0082c8`],
    articleList:[
      'c19930903-1',
      'c19930903-2',
      'c19930903-3',
      'c19930903-4',
      'c19930903-5',
      'c19930903-6',
      'c19930903-7',
      'c19930903-8',
      'c19930903-9',
      'c19930903-10',
    ],
    cachePages:[]
  },
  getters:{

  },
  mutations: {
    loadingStart(state:RootState){
      state.globalLoad = true;
    },
    loadingOver(state:RootState){
      state.globalLoad = false;
    },
    setCachePages(state:RootState,arr){
      let res:any = state.cachePages;
      state.cachePages = res.concat(arr);
    }
  },
  actions: {

  },
  strict: process.env.NODE_ENV==="development",
  modules
};


Vue.use(Vuex);
const store = new Vuex.Store<RootState>(option);



export default store
