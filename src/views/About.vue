<!--<template>-->
  <!--<div class="about">-->
    <!--<h1>This is an about page</h1>-->
  <!--</div>-->
<!--</template>-->

<script lang="ts">
  import { Component, Vue} from 'vue-property-decorator';

  @Component({
    render(h){
      return h('div',{
        'class':'about'
      },[
        h('h1','This is an about page')
      ])
    }
  })
  export default class About extends Vue {
    mounted(){

    }
  }
</script>

<style lang="scss">
  .about{
    height: 500px;
    overflow-y: auto;
    h1{
      height: 2000px;
      background: #f00;
    }

  }
</style>
