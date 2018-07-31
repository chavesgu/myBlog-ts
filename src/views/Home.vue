<template>
  <div class="hello">
    <h2 class="title">$store→state→testData:{{$store.state.testData}}</h2>


    <div class="chart" ref="chart1" style="width: 900px;height: 500px;">

    </div>
    <div class="chart" ref="chart2" style="width: 500px;height: 200px;">

    </div>

    <div class="beian">
      <div class="botBeiAn"><a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" target="_blank">沪ICP备17017527号-1 </a></div>
      <div class="gov"><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32092502000073" target="_blank"><img
              src="//images.chavesgu.com/ghs.png" alt="">苏公网安备 32092502000073号</a></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue} from 'vue-property-decorator';
import { namespace } from 'vuex-class';

@Component({
  metaInfo:{
    titleTemplate:'%s - Home'
  }
})
export default class Home extends Vue {
  $echarts:any;
  @namespace('user').Action('login') login:any;


  mounted(){
    let option = {
      title:{
        text:'Echarts is so cool',
        x:'center',
        top:20,
        textStyle:{
          fontSize:28
        }
      },
      legend:{
        top:100,
        data:['line1','bar1','bar2']
      },
      grid:{
        top:150
      },
      tooltip:{
        enabled:true
      },
      xAxis: {
        type: 'category',
        axisTick:{
          alignWithLabel:true
        },
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        axisLabel:{
          showMinLabel:false
        }
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
          name:'line1'
        },
        {
          data: [100, 100, 50, 30, 90, 60, 50],
          type: 'bar',
          name:'bar1'
        },
        {
          data: [30, 10, 50, 70, 50, 120, 10],
          type: 'bar',
          name:'bar2'
        }
      ]
    };
    let myChart = this.$echarts.init(this.$refs.chart1,'shine');
    myChart.setOption(option);

    let option2 = {
      legend:{
        orient: 'vertical',
        right:10,
        data:['type1','type2','type3','type4','type5']
      },
      tooltip:{
        enabled:true
      },
      series: [
        {
          data: [
            {value:100,name:'type1'},
            {value:30,name:'type2'},
            {value:20,name:'type3'},
            {value:70,name:'type4'},
            {value:10,name:'type5'}
          ],
          type: 'pie',
          radius:['30%','75%'],
          selectedMode:true
        }
      ]
    };
    let myChart2 = this.$echarts.init(this.$refs.chart2,'shine');
    myChart2.setOption(option2);
  }
}
</script>

<style lang="scss">
  .hello{
    height: 100%;
    position: relative;
    h2{
      color: $--color-info;
    }
    .beian{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      margin: auto;
      img{
        vertical-align: middle;
        margin-right: 8px;
      }
    }
  }
</style>