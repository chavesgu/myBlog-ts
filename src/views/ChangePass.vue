<template>
  <div class="changePass">
    <div class="tab">
      <router-link :to="{name:'Change-pass'}">原密码修改</router-link>
      <router-link :to="{name:'Change-mobile'}">手机修改</router-link>
      <router-link :to="{name:'Change-email'}">邮箱修改</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    metaInfo:{
      titleTemplate:'%s - ChangePass'
    }
  })
  export default class ChangePass extends Vue {

  }
</script>

<style lang="scss">
  .changePass{
    width: 900px;
    margin: 50px auto;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
    .tab{
      display: flex;
      border-bottom: 1px solid #ddd;
      a{
        padding: 0 20px;
        display: block;
        line-height: 60px;
        font-size: 20px;
        transition: background .3s;
        &:hover{
          background: lighten($--color-primary,20%);
          transition: background .3s;
        }
        &.router-link-active{
          background: lighten($--color-primary,20%);
        }
      }
    }
  }
</style>