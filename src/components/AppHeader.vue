<template>
  <div class="header">
    <el-menu
            :default-active="$route.name"
            class="nav"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            @select="goPage">
      <router-link to="/" class="logo"><img src="../assets/images/logo.png" alt=""></router-link>
      <router-link :to="{name:'SignIn'}" class="signIn" v-if="!user">
        <i class="iconfont chaves-account"></i>
        <span>Sign In</span>
      </router-link>
      <router-link :to="'/admin/'+user" class="signIn" v-else>
        <i class="iconfont chaves-account"></i>
        <span>Account</span>
      </router-link>
      <el-menu-item v-for="item in menuArr"
                    :index="item.name"
                    :key="item.name"
                    class="nav-item"
      >
        {{item.name}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import myCookie from '@/utils/cookie'

  @Component({})
  export default class AppHeader extends Vue {
    get user():any{
      return myCookie.getItem("user") || null;
    };
    get menuArr():object[]{
      let router:any = this.$router;
      return router.options.routes[1].children
        .filter((item:{meta:{show:boolean}})=>item.meta.show);
    };

    goPage(index:string,path:string){
      this.$router.push({name:index})
    }
  }
</script>

<style scoped lang="scss">
  .header{
    height: 60px;
    background: #f3f3f3;
    position: relative;
    z-index: 2;
    overflow: hidden;
    .nav{
      height: 60px;
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.5);
      border-bottom: none;
      .nav-item{
        height: 60px;
        user-select: none;
        padding: 0 40px;
        font-weight: bold;
        &.is-active{
          color: $--color-primary;
          border-bottom-color: $--color-primary;
        }
      }
    }
    a.logo{
      float: left;
      height: 60px;
      line-height: 60px;
      padding: 0 30px;
      position: relative;
      z-index: 2;
      user-select: none;
      img{
        height: 60%;
        vertical-align: middle;
        user-select: none;
        &:focus{
          outline: 0;
        }
      }
      &:hover{
        animation: logo-scale .5s linear 1;
      }
    }
    a.signIn{
      float: right;
      position: relative;
      z-index: 2;
      font-size: 14px;
      line-height: 60px;
      padding-right: 20px;
      transition: margin-right .6s;
      user-select: none;
      i{
        margin-right: 20px;
      }
    }
  }
  @keyframes logo-scale {
    0%,100%{
      transform: scale(1);
    }
    50%{
      transform: scale(1.4);
    }
  }
</style>