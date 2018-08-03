<template>
  <div class="loading-bar" :style="style"></div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class LoadingBar extends Vue {
    percent:number = 0;
    show:boolean = false;
    canSuccess:boolean = true;
    duration:number = 3000;
    height:string = '3px';
    _timer:any = NaN;
    _cut:number = NaN;

    get style():object{
      let res = {
        'width': this.percent + '%',
        'height': this.height,
        'opacity': this.show ? 1 : 0
      };
      if (this.percent===100&&this.canSuccess){
        return Object.assign(res,{
          'background-color': '#47e487',
        })
      }
      if (!this.canSuccess){
        return Object.assign(res,{
          'background-color': '#ff0000',
        })
      }
      return res
    }


    start() {
      this.show = true;
      this.canSuccess = true;
      if (this._timer) {
        clearInterval(this._timer);
        this.percent = 0;
      }
      this._cut = 10000 / Math.floor(this.duration);
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random());
        if (this.percent > 95) {
          this.finish();
        }
      }, 100);
      return this;
    };
    set(num:number) {
      this.show = true;
      this.canSuccess = true;
      this.percent = Math.floor(num);
      return this;
    };
    get() {
      return Math.floor(this.percent);
    };
    increase(num:number) {
      this.percent = this.percent + Math.floor(num);
      return this;
    };
    decrease(num:number) {
      this.percent = this.percent - Math.floor(num);
      return this;
    };
    finish() {
      this.percent = 100;
      this.hide();
      return this;
    };
    pause() {
      clearInterval(this._timer);
      return this;
    };
    hide() {
      clearInterval(this._timer);
      this._timer = undefined;
      setTimeout(() => {
        this.show = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.percent = 0;
          }, 200);
        });
      }, 500);
      return this;
    };
    fail() {
      this.canSuccess = false;
      return this;
    }
  }
</script>

<style scoped lang="scss">
  .loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    width: 0;
    transition: width .2s, opacity .4s;
    opacity: 1;
    background-color: $--color-primary;
    z-index: 999999;
  }
</style>