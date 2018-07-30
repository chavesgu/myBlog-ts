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
  import myCookie from '@/utils/cookie'

  @Component({
    metaInfo:{
      titleTemplate:'%s - admin'
    }
  })
  export default class Admin extends Vue {
    @namespace('user').State('info') info:object;
    @namespace('user').Action('qiniuToken') qiniuToken:any;
    @namespace('user').Action('saveUserInfo') saveUserInfo:any;
    @namespace('user').Action('getUserInfo') getUserInfo:any;

    file:string='';
    filename:string='';
    canUpload:boolean=false;
    uploadToken:string='';
    uploadPercent:number=0;
    progressColor:string='#409EFF';

    get user(){
      return this.$route.params['userName'] || '';
    }

    upload(file:any){
      if (file.size/1024/1024 > 2){
        this.uploadMaxSize();
        return false
      }
      if (!/^image\/(jpg|jpeg|png|gif)$/.test(file.type)) {
        this.uploadFormatError();
        return false
      }
      this.qiniuToken().then((data:any)=>{
        if (data.code===200){
          this.file = file;
          this.filename = myCookie.getItem('user')+'.jpg';
          this.uploadToken=data.uploadToken;
          this.canUpload = true;
          this.uploadPercent = 0;
        }
      }).catch((err:any)=>{
        this.$alert('get photo token fail',{
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
        next(res:any){
          // ...
          _this.uploadPercent = res.total.percent;
        },
        error(err:any){
          // ...
          console.log(err);
        },
        complete(res:any){
          // ...
          _this.progressColor = '#67c23a';
          _this.saveUserInfo({
            photo:`//profile.chavesgu.com/${myCookie.getItem('user')}.jpg?time=${+new Date()}`
          }).then((data:any)=>{
            if (data.code===200){
              _this.getUserInfo();
            }else {
              _this.$alert(data.msg,{
                title:'Message',
                type:'error'
              })
            }
            _this.file = '';
            _this.canUpload = false;
            _this.uploadPercent = 0;
          });
        }
      })
    };
    uploadFormatError(file?:any) {
      this.$alert('只支持jpg,png,gif格式',{
        title:'Message',
        type:'error'
      })
    };
    uploadMaxSize(file?:any) {
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