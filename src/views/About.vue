<template>
  <section class="about">
    <el-card class="card">
      <p slot="header"><i class="iconfont chaves-make"></i><span>网站制作</span></p>
      <p>前端编码：Vue<a href="https://github.com/chavesgu" target="_blank">@chaves</a></p>
      <p>后端编码：Node<a href="https://github.com/chavesgu" target="_blank">@chaves</a></p>
      <p>页面风格：<a href="http://element-cn.eleme.io/" target="_blank">@element-ui</a></p>
      <p>logo以及favicon设计：<a href="http://www.zcool.com.cn/u/14228135" target="_blank">@Arey睿</a></p>
    </el-card>
    <el-card class="card">
      <p slot="header"><i class="iconfont chaves-contact"></i><span>联系站长</span></p>
      <p><i class="iconfont chaves-email"></i> chavesgu@qq.com / mail@chavesgu.com</p>
      <p><i class="iconfont chaves-qq"></i> <a href="http://wpa.qq.com/msgrd?v=3&uin=595077937&site=qq&menu=yes" target="_blank">在线联系qq</a></p>
      <p><i class="iconfont chaves-wechat"></i> <a href="javascript:;" @click="wechat = true">@chaves</a></p>
    </el-card>
    <el-dialog :visible.sync="wechat" width="360px">
      <p slot="title" style="text-align:center">
        <span>微信二维码</span>
      </p>
      <div style="text-align:center">
        <img src="//cdn.chavesgu.com/wechat.jpg" alt="" style="width: 100%;">
      </div>
      <div slot="footer">
        <el-button type="primary" size="large" long @click="wechat = false">确认</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script lang="ts">
  import { Component, Vue} from 'vue-property-decorator';

  @Component({
    metaInfo:{
      titleTemplate:'%s - About'
    }
  })
  export default class About extends Vue {
    wechat=false;
    mounted(){

    }
  }
</script>

<style scoped lang="scss">
  .about{
    width: 900px;
    margin: 0 auto;
    padding: 30px 0;
    .card{
      margin-bottom: 30px;
      p{
        line-height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
      }
      &:last-child{
        margin-bottom: 0;
      }
      i,span{
        font-size: 18px;
        margin-right: 10px;
      }
    }
  }
</style>
