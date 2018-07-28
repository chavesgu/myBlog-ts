<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary" @click="handleClick">click me</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component({

})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  @Emit('click')
  handleClick(){}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
