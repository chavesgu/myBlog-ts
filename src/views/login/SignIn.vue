<template>
  <div class="signIn">
    <el-form ref="signIn" :model="signInInfo" :rules="signInRule" label-position="right" label-width="150px">
      <el-form-item prop="user" label="User">
        <el-input type="text" size="large" v-model="signInInfo.user" placeholder="User name"
                  @keyup.enter.native="mySubmit" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input type="password" size="large" v-model="signInInfo.password" placeholder="Password"
                  @keyup.enter.native="mySubmit"
                  style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="large" @click="mySubmit" @keyup.enter.native="mySubmit('signIn')">Sign
          In
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace} from 'vuex-class';
  import secret from 'crypto-js'
  import myCookie from '@/utils/cookie'

  @Component({
    metaInfo: {
      titleTemplate: '%s - signIn'
    }
  })
  export default class SignIn extends Vue {
    @namespace('user').Action('login') login:any;

    signInInfo = {
      user: '',
      password: ''
    };
    signInRule = {
      user: [
        {required: true, message: "Must not be empty", trigger: "blur"},
        {pattern: /[0-9A-z]/, message: "Must not use special sign", trigger: ["change", "blur"]}
      ],
      password: [
        {required: true, message: "Must not be empty", trigger: "blur"},
        {min: 6, message: "Must be 6 at least", trigger: ["change", "blur"]}
      ]
    };

    mySubmit() {
      this.$refs.signIn.validate((valid:any) => {
        if (valid) {
          this.login({
            user: this.signInInfo.user,
            password: secret.SHA256(this.signInInfo.password).toString(secret.enc.Hex)
          }).then((data:any) => {
            const _this = this;
            this.$alert(data.msg,{
              title: 'Message',
              type: data.code===200?"success":"error",
              callback() {
                if (data.code===200) {
                  myCookie.setItem("user",data.userInfo.name,30*60);
                  if (_this.$route.query["redirect"]&&_this.$route.query["redirect"]!=='admin') {
                    _this.$router.replace({name:_this.$route.query["redirect"]});
                  }else {
                    _this.$router.replace({name: 'admin', params: {userName: data.userInfo.name as string}});
                  }
                }
              }
            })
          }).catch((error:any)=>{
            console.log(error);
            this.$alert('login fail',{
              title: 'Error',
              type: 'error'
            })
          })
        }
      })
    }
  }
</script>

<style scoped>

</style>