import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import router from './router/'
import './vue-class-config'
import './element'
import './echarts'
import './utils/directive';
import VueMeta from 'vue-meta'


// import css
import "./assets/reset.css";
import './assets/theme/index.scss';
import 'prismjs/themes/prism-okaidia.css'

Vue.use(VueMeta);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
