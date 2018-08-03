<template>
  <div id="app" v-loading.fullscreen.lock="$store.state.globalLoad">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  // import axios from 'axios'
  @Component({
    metaInfo:{
      title:'Chaves'
    }
  })
  export default class App extends Vue {
    mounted(){
      // axios.get('/qqyy?type=1&json=1&utf8=1&onlysong=0&disstid=3602407677&format=jsonp&g_tk=5381&jsonpCallback=playlistinfoCallback&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',{
      //   withCredentials:false
      // }).then((data:any)=>{
      //     console.log(data)
      //   })
    }
  }
</script>

<style lang="scss">
  @import url('//at.alicdn.com/t/font_545903_v53el4en5vp.css');
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
  }
  /*transition-css-start*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  /*transition-css-over*/

</style>
