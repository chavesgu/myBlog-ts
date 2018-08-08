import Vue from 'vue'
import Router,{RouterOptions,RouteConfig,Route} from 'vue-router'
import Layout from '../Layout.vue';
import Home from '@/views/Home.vue';
import myCookie from '@/utils/cookie'
import store from '../store/index'

// const beforeEnter = (to:Route,from:Route,next:any) =>{
//   store.dispatch('user/getUserInfo')
//     .then(()=>next())
//     .catch(()=>{
//       next({name:'SignIn',replace:true,query:{redirect:to.name as string}})
//     });
// };

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
      redirect:'home',
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
          // beforeEnter
        },
        {
          path:'article/:id',
          name:'Article',
          meta:{
            check:true,
            show:false,
            getInfo:true
          },
          component:()=>import(/* webpackChunkName: "Article" */ '@/views/MyArticle.vue'),
          // beforeEnter
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
          // beforeEnter
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
              component:()=>import(/* webpackChunkName: "changepass" */ '@/views/changePass/OldPass.vue'),
              // beforeEnter
            },
            {
              path:'mobile',
              name:'Change-mobile',
              meta:{
                check: true,
                show: false,
                getInfo:true
              },
              component:()=>import(/* webpackChunkName: "changepass" */ '@/views/changePass/Mobile.vue'),
              // beforeEnter
            },
            {
              path:'email',
              name:'Change-email',
              meta:{
                check: true,
                show: false,
                getInfo:true
              },
              component:()=>import(/* webpackChunkName: "changepass" */ '@/views/changePass/Email.vue'),
              // beforeEnter
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

Vue.use(Router);
const router = new Router(opt);

router.beforeEach((to, from, next)=>{
  const store:any = router.app.$options.store;
  if (to.name==='SignIn'&&myCookie.getItem("user")) {
    next({name:'Admin',params:{userName:myCookie.getItem("user")as string}});
    return
  }
  if (to.meta.check){
    if (myCookie.getItem("user")) {
      if (to.meta.getInfo && store.state.user.needUpdateInfo){
        store.dispatch('user/getUserInfo')
          .then(()=>next())
          .catch(()=>{
            next({name:'SignIn',replace:true,query:{redirect:to.name as string}})
          });
      }else {
        next();
      }
      // next()
    }else {
      next({name:'SignIn',replace:true,query:{redirect:to.name as string}});
    }
  } else {
    next()
  }
});

router.afterEach((to, from) => {
  // ...

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
// store.commit('setCachePages',cachePages);


setTimeout(()=>{
  //console.log(store);//不加settimeout   就是undefined
  store.commit('setCachePages',cachePages);
},0);

export {cachePages};

export default router;

