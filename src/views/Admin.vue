<template>
  <div class="admin">
    <h1 style="line-height: 30px;">account:{{user}}</h1>
    <div class="photo">
      <div class="pic">
        <img :src="info.photo" ref="photo" alt="" v-if="info.photo">
        <i class="iconfont chaves-profile1" v-else></i>
      </div>
      <div class="upload">
        <el-upload class="area" ref="upload"
                   :show-file-list="false"
                   :before-upload="upload"
                   action="https://admin.chavesgu.com/upload">
          <el-button size="large">更换头像图片</el-button>
        </el-upload>
        <p class="file-txt" v-if="file!==null">{{file.name}}</p>
        <div class="progress">
          <el-progress :percentage="uploadPercent" :color="progressColor" :stroke-width="10" v-if="file!==null"></el-progress>
        </div>
        <el-button type="primary" :disabled="!canUpload" @click="startUpload">开始上传</el-button>
      </div>
    </div>
    <div class="change-password">
      <el-button type="primary" plain @click="changePass">修改密码</el-button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace} from 'vuex-class';
  import * as qiniu from 'qiniu-js'
  import myCookie from '@/assets/utils/cookie'

  @Component({
    metaInfo:{
      titleTemplate:'%s - admin'
    }
  })
  export default class Admin extends Vue {
    @namespace('info').State('info') info:object;

    file=null;
    filename='';
    canUpload=false;
    uploadToken=null;
    uploadPercent=0;
    progressColor='#409EFF';

    get user(){
      return this.$route.params['userName'] || '';
    }

    upload(file){
      if (file.size/1024/1024 > 2){
        this.uploadMaxSize();
        return false
      }
      if (!/^image\/(jpg|jpeg|png|gif)$/.test(file.type)) {
        this.uploadFormatError();
        return false
      }
      this.$store.dispatch('info/qiniuToken',file).then(res=>{
        if (res.code===200){
          this.file = file;
          this.filename = myCookie.getItem('user')+'.jpg';
          this.uploadToken=res.uploadToken;
          this.canUpload = true;
          this.uploadPercent = 0;
        }
      }).catch(err=>{
        this.$alert(err.toString(),{
          title:'Message',
          type:'error'
        })
      });
      return false
    };
    startUpload(){
      let newfile = new File([this.file ], this.filename,{type:"image/jpg"});

      let observable = qiniu.upload(
        newfile,
        newfile.name,
        this.uploadToken,
        {},
        {
          useCdnDomain: true,
          region: qiniu.region.z0
        }
      );
      let _this = this;
      let subscription = observable.subscribe({
        next(res){
          // ...
          _this.uploadPercent = res.total.percent;
        },
        error(err){
          // ...
          console.log(err);
        },
        complete(res){
          // ...
          _this.progressColor = '#67c23a';
          _this.$store.dispatch('info/saveInfo',{photo:`//profile.chavesgu.com/${myCookie.getItem('user')}.jpg?time=${+new Date()}`})
            .then(data=>{
              if (data.code===200){
                _this.$store.dispatch('info/getInfo');
              }else {
                _this.$alert(data.msg,{
                  title:'Message',
                  type:'error'
                })
              }
              _this.file = null;
              _this.canUpload = false;
              _this.uploadPercent = 0;
            });
          // window.location.reload();
        }
      })
    };
    uploadFormatError(file?) {
      this.$alert('只支持jpg,png,gif格式',{
        title:'Message',
        type:'error'
      })
    };
    uploadMaxSize(file?) {
      this.$alert('图片大小不能超过2M',{
        title:'Message',
        type:'error'
      })
    };
    changePass(){
      this.$router.push({name:'changePass'})
    }
  }
</script>

<style scoped lang="scss">
  .admin{
    width: 500px;
    margin: 0 auto;
    text-align: left;
    display: flex;
    flex-direction: column;
    h1{
      margin: 20px 0;
    }
    .photo{
      display: flex;
      flex-direction: row;
      .pic{
        width: 128px;
        height: 128px;
        overflow: hidden;
        margin-right: 30px;
        i{
          font-size: 80px;
        }
        img{
          width: 100%;
        }
      }
      .upload{
        .area{

        }
        .file-txt{
          width: 100%;
          text-align: center;
          height: auto;
          margin: 20px 0;
        }
        .progress{
          margin-bottom: 20px;
        }
      }
    }
    .change-password{
      margin: 20px 0;
    }
  }
</style>