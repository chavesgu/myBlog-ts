<template>
  <div id="app" v-loading.fullscreen.lock="$store.state.globalLoad">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  @Component({
    metaInfo:{
      title:'Chaves',
      link: [
        { rel: 'icon', href: '//images.chavesgu.com/title.ico',type:'img/x-ico' }
      ]
    }
  })
  export default class App extends Vue {

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
