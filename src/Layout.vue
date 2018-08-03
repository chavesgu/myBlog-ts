<template>
  <div class="layout">
    <keep-alive>
      <AppHeader></AppHeader>
    </keep-alive>
    <div class="main">
      <transition name="fade" mode="out-in">
        <keep-alive :include="['About']">
          <router-view/>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AppHeader from './components/AppHeader.vue';

  @Component({
    components: {
      AppHeader
    }
  })
  export default class Layout extends Vue {

  }
</script>

<style scoped lang="scss">
  .layout{
    height: 100vh;
    display: flex;
    flex-direction: column;
    .main {
      overflow-y: hidden;
      overflow-x: auto;
      flex: 1;
      width: 100vw;
      text-align: center;
    }
  }
</style>