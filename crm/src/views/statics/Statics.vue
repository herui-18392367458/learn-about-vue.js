<template>
  <div class="wrapper">
    <div id="polyline" ref="polyline" class="polyline"></div>
    <div id="pie" class="pie"></div>
  </div>
</template>
<script>
import ECharts from "echarts";
export default {
  data(){
       return{
           pieList:[]
       }
  },
  methods: {
    initPolyline() {
      var myPolylineChart = ECharts.init(this.$refs.polyline);
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myPolylineChart.setOption(option);
    },
    initPie() {
      var myPieChart = ECharts.init(document.getElementById("pie"));
      var option = {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.pieList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myPieChart.setOption(option)
    }
  },
  async mounted() {
    this.initPolyline();
    let rs=await this.$http.get('/api/static/chartPie')
    if(rs.data.code===1){
        this.pieList=rs.data.list
        this.$nextTick(()=>{
            this.initPie()
        })
    }
    
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .polyline {
    width: 400px;
    height: 400px;
    //    background: darkgray;
  }
  .pie {
    width: 400px;
    height: 400px;
    //    background:rgb(122, 99, 165);
    margin-left: 10px;
  }
}
</style>