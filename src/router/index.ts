import Vue from 'vue'
import Router,{RouterOptions} from 'vue-router'
import store from '@/store/'
import Layout from '../Layout.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue'
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
      name: 'login',
      redirect:{name:'signIn'},
      component: Login,
      children:[
        {
          path: 'register',
          name: 'register',
          component: ()=>import(/* webpackChunkName: "login" */ '@/views/login/Register.vue')
        },
        {
          path: 'signIn',
          name: 'signIn',
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
          name:'home',
          meta:{
            show:true
          },
          component:Home,
        },
        {
          path:'blog',
          name:'blog',
          meta:{
            check:true,
            show:true,
            getInfo:true
          },
          component:()=>import('@/views/Blog.vue'),
        },
        {
          path:'article/:id',
          name:'article',
          meta:{
            check:true,
            show:false,
            getInfo:true
          },
          component:()=>import('@/views/MyArticle.vue'),
          beforeEnter: (to, from, next)=> {
            if (to.params.id && store.state.articleList.includes(to.params.id)) {
              next();
            }else {
              next({name:'blog'});
            }
          }
        },
        {
          path: 'about',
          name: 'about',
          meta:{
            show:true
          },
          component: ()=>import('@/views/About.vue')
        },
        {
          path: 'admin/:userName',
          name:'admin',
          meta:{
            check:true,
            show:false,
            getInfo:true
          },
          component: ()=>import('@/views/Admin.vue'),
        },
        {
          path: 'changePass',
          name: 'changePass',
          meta:{
            show: false
          },
          redirect:{name:'change-pass'},
          component: ()=>import(/* webpackChunkName: "changepass" */ '@/views/ChangePass/Index.vue'),
          children:[
            {
              path:'pass',
              name:'change-pass',
              meta:{
                check: true,
                show: false,
                getInfo:true
              },
              component:()=>import(/* webpackChunkName: "changepass" */ '@/views/changePass/OldPass.vue')
            },
            {
              path:'mobile',
              name:'change-mobile',
              meta:{
                check: true,
                show: false,
                getInfo:true
              },
              component:()=>import(/* webpackChunkName: "changepass" */ '@/views/changePass/Mobile.vue')
            },
            {
              path:'email',
              name:'change-email',
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
        router.app.$store.dispatch('info/getInfo')
          .then(_=>next()).catch(_=>next());
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


export default router;
