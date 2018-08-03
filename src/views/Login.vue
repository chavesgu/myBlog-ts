<template>
  <section class="login">
    <router-link class="back" to="/">back to home</router-link>
    <div class="choose">
      <el-button-group>
        <el-button @click="goTo('Register')" :type="registerType">Register</el-button>
        <el-button @click="goTo('SignIn')" :type="signInType">Sign In</el-button>
      </el-button-group>
    </div>
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </section>
</template>

<script lang="ts">
  import {Component, Watch, Vue} from 'vue-property-decorator';

  @Component({
    metaInfo:{
      titleTemplate:'%s - Login'
    }
  })
  export default class Login extends Vue {
    registerType='primary';
    signInType='ghost';

    @Watch('$route')
    routeChange(){
      this.checkUrl();
    }


    created(){
      this.checkUrl();
    }
    goTo(url:string){
      this.$router.push({name:url});
    };
    checkUrl(){
      if (this.$route.name==='signIn'){
        this['signInType'] = 'primary';
        this['registerType'] = '';
      }else {
        this['signInType'] = '';
        this['registerType'] = 'primary';
      }
    }
  }
</script>

<style lang="scss">
  .login{
    padding: 50px 0;
    text-align: center;
    .back{
      font-size: 24px;
      display: inline-block;
    }
    .choose{
      text-align: right;
      padding-right: 20px;
      a{
        color: #495060;
      }
    }
    .content{
      width: 900px;
      margin: 0 auto;
      padding: 50px 30px;
      form {
        width: 520px;
        margin: 0 auto;
        text-align: left;
      }
    }
  }
</style>