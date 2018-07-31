<template>
  <div class="oldPass">
    <el-form ref="pass" :model="passInfo" :rules="passRule" label-position="right" label-width="150px">
      <el-form-item class="item" prop="old" label="old">
        <el-input type="password" v-model="passInfo.old" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item class="item" prop="new" label="new">
        <el-input type="password" v-model="passInfo.new" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item class="item" prop="confirmNew" label="confirm new">
        <el-input type="password" v-model="passInfo.confirmNew" placeholder="请确认新密码"></el-input>
      </el-form-item>
      <el-form-item class="item">
        <el-button type="primary" @click="changePass">确认</el-button>
        <el-button @click="$router.push({name:'admin'})">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace} from 'vuex-class'

  @Component({})
  export default class OldPass extends Vue {
    $refs:any;
    @namespace('user').Action('oldChangePass') oldChangePass:any;

    passInfo = {
      old: '',
      new: '',
      confirmNew: ''
    };
    passRule = {
      old: [
        {required: true, message: "Must not be empty", trigger: "blur"},
        {min: 6, message: "Must be 6 at least", trigger: ["change", "blur"]}
      ],
      new: [
        {required: true, message: "Must not be empty", trigger: "blur"},
        {min: 6, message: "Must be 6 at least", trigger: ["change", "blur"]}
      ],
      confirmNew: [
        {required: true, message: "Must not be empty", trigger: "blur"},
        {min: 6, message: "Must be 6 at least", trigger: ["change", "blur"]},
        {
          validator: (rule:any, value:any, callback:any, source:any, options:any) => {
            var errors = [];
            if (this.passInfo.new !== value) {//自定义规则 两次密码不一样
              errors.push(
                new Error("password is different")
              )
            }
            callback(errors);
          }, trigger: ["change", "blur"]
        }
      ]
    };

    changePass(){
      this.$refs["pass"]["validate"]((valid:any)=>{
        if (valid){
          this.oldChangePass({
            oldPass:this.passInfo.old,
            newPass:this.passInfo.new
          }).then((data:any)=>{
            this.$alert(data.msg,{
              type:data.code===200?'success':'error',
              title:'Message'
            });
          }).catch((err:any)=>{
            this.$alert('修改失败',{
              type:'error',
              title:'Message'
            });
          });
        }
      })
    }
  }
</script>

<style lang="scss">
  .oldPass{
    padding: 40px;
    text-align: left;
    form{

      .item{
        margin: 30px 0;
      }
      input{
        width: 200px;
      }
    }
  }
</style>