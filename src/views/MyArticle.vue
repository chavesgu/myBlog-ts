<template>
  <div class="article" :style="{background:bg,width:bgWidth+'%'}">
    <div v-loading="loadWord" class="word"
         :style="{
          transform:`translateY(${wordTop}vh)`,
          'box-shadow': `0 3px 20px 0 ${bg} inset,0 -3px 10px 0 ${bg} inset`
         }">
      <div class="container" v-html="wordContent" v-prism>

      </div>
      <i class="close iconfont chaves-close1" :style="{color:bg}" @click="$router.push({name:'Blog'})"></i>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import TWEEN from '@tweenjs/tween.js'
  import store from '@/store/'

  @Component({
    metaInfo:{
      titleTemplate:'%s - Article'
    }
  })
  export default class MyArticle extends Vue {
    animate:boolean = true;
    bgWidth:number = 0;
    wordTop:number = 100;
    tweenOpen:any = undefined;
    tweenTop:any = undefined;
    loadWord:boolean = false;
    wordContent:any = '';

    get bg(){
      return this.$store.state.articleBgList[this.$store.state.articleList.indexOf(this.$route.params['id'])%this.$store.state.articleBgList.length];
    }

    mounted(){
      let _this = this;
      // this.wordScroll = new IScroll('.article .word',{
      //   mouseWheel:true,
      //   mouseWheelSpeed:10,
      //   disableMouse:true
      // });
      let animate =()=> {
        if (this.animate){
          requestAnimationFrame(animate);
          TWEEN.update();
        }
      };
      animate();
      this.tweenOpen = new TWEEN.Tween(_this);
      this.tweenTop = new TWEEN.Tween(_this);
      this.tweenOpen.to({bgWidth:100},600).start().onComplete(function () {
        _this.tweenTop.to({wordTop:0},400).start().onComplete(function () {
          _this.tweenTop = undefined;
          _this.tweenOpen = undefined;
          _this.animate = false;
        })
      });
    }

    beforeRouteEnter(to:any, from:any, next:any) {
      if (to.params.id && store.state.articleList.includes(to.params.id)) {
        next();
      }else {
        next({name:'blog'});
      }
    }
  }
</script>

<style scoped lang="scss">
  .article{
    height: 100%;
    display: inline-block;
    .word{
      width: 900px;
      height: 100%;
      background: #fff;
      margin: 0 auto;
      position: relative;
      .container{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 200vh;
      }
      i.close{
        position: absolute;
        width: 34px;
        height: 34px;
        top: 20px;
        right: 20px;
        font-size: 30px;
        cursor: pointer;
      }
    }
  }
</style>