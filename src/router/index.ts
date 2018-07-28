import Vue from 'vue'
import Router,{RouterOptions} from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

const opt:RouterOptions = {
  base:'/',
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: ()=>import(/*webpackChunkName: "about" */ '../views/About.vue')
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition
  }
};

const router = new Router(opt);


export default router;
