<template>
  <div class="home">
    <HelloWorld :msg="msg" @click="handleConsole"/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  }
})
export default class Home extends Vue {
  @namespace('user').Action('login') login:any;

  msg = 'Welcome to Your Vue.js + TypeScript App';

  mounted(){
    // this.login()
  };

  handleConsole(){
    console.log('click success');
  }
}
</script>
