import Vue from 'vue'
import Router,{RouterOptions,RouteConfig} from 'vue-router'
import Layout from '../Layout.vue';
import Home from '@/views/Home.vue';
import myCookie from '@/utils/cookie'
import LoadingBar from '../components/LoadingBar.vue'

// add loading-bar
const loadingBar:any = Vue.prototype.$loadingBar = new Vue(LoadingBar).$mount();
document.body.appendChild(loadingBar.$el);
Vue.use(Router);

const opt:RouterOptions = {
  base:'/',
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      redirect:{name:'SignIn'},
      component: ()=>import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      children:[
        {
          path: 'register',
          name: 'Register',
          component: ()=>import(/* webpackChunkName: "login" */ '@/views/login/Register.vue')
        },
        {
          path: 'signIn',
          name: 'SignIn',
          component: ()=>import(/* webpackChunkName: "login" */ '@/views/login/SignIn.vue')
        }
      ]
    },
    {
      path:'/',
      name:'layout',
      component:Layout,
      redirect:'Home',
      children:[
        {
          path:'home',
          name:'Home',
          meta:{
            show:true,
            cache:true
          },
          component:Home,
        },
        {
          path:'blog',
          name:'Blog',
          meta:{
            check:true,
            show:true,
            getInfo:true
          },
          component:()=>import(/* webpackChunkName: "blog" */ '@/views/Blog.vue'),
        },
        {
          path:'article/:id',
          name:'Article',
          meta:{
            check:true,
            show:false,
            getInfo:true
          },
          component:()=>import(/* webpackChunkName: "Article" */ '@/views/MyArticle.vue')
        },
        {
          path: 'about',
          name: 'About',
          meta:{
            show:true,
            cache:true
          },
          component: ()=>import(/* webpackChunkName: "About" */ '@/views/About.vue')
        },
        {
          path: 'admin/:userName',
          name:'Admin',
          meta:{
            check:true,
            show:false,
            getInfo:true
          },
          component: ()=>import(/* webpackChunkName: "Admin" */ '@/views/Admin.vue'),
        },
        {
          path: 'changePass',
          name: 'ChangePass',
          meta:{
            show: false
          },
          redirect:{name:'Change-pass'},
          component: ()=>import(/* webpackChunkName: "changepass" */ '@/views/ChangePass.vue'),
          children:[
            {
              path:'pass',
              name:'Change-pass',
              meta:{
                check: true,
                show: false,
                getInfo:true
              },
              component:()=>import(/* webpackChunkName: "changepass" */ '@/views/changePass/OldPass.vue')
            },
            {
              path:'mobile',
              name:'Change-mobile',
              meta:{
                check: true,
                show: false,
                getInfo:true
              },
              component:()=>import(/* webpackChunkName: "changepass" */ '@/views/changePass/Mobile.vue')
            },
            {
              path:'email',
              name:'Change-email',
              meta:{
                check: true,
                show: false,
                getInfo:true
              },
              component:()=>import(/* webpackChunkName: "changepass" */ '@/views/changePass/Email.vue')
            },
          ]
        }
      ]
    }
  ],
  scrollBehavior:(to,from,savedPosition)=>{
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      const position:any = {};
      // new navigation.
      // scroll to anchor by returning the selector
      if (to.hash) {
        position.selector = to.hash
      }
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0;
        position.y = 0
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position
    }
  }
};

const router = new Router(opt);

router.beforeEach((to, from, next)=>{
  loadingBar.start();
  if (to.name==='signIn'&&myCookie.getItem("user")) {
    next({name:'admin',params:{userName:myCookie.getItem("user")as string}});
    return
  }
  if (to.meta.check){
    if (myCookie.getItem("user")) {
      if (to.meta.getInfo){
        router.app.$store.dispatch('user/getUserInfo')
          .then(_=>next())
          .catch(_=>{
            next({name:'signIn',replace:true,query:{redirect:to.name as string}})
          });
      }else {
        next();
      }
    }else {
      next({name:'signIn',replace:true,query:{redirect:to.name as string}});
    }
  } else {
    next()
  }
});

router.afterEach((to, from) => {
  // ...
  loadingBar.finish();
});

const cachePages:string[] = [];
const getCachePages = (routes:RouteConfig[]) =>{
  for (let item of routes) {
    if (item.meta&&item.meta.cache){
      if(cachePages.indexOf(item.name as string)===-1)cachePages.push(item.name as string);
    }
    if (item.children&&item.children.length>0){
      getCachePages(item.children)
    }
  }
};
getCachePages(opt.routes as RouteConfig[]);

export {cachePages};

export default router;