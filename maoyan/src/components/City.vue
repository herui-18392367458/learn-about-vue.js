<template>
  <div style="height:100%">
    <div id="city-container" class="city-container">
      <section id="city-list" class="city-list-container" style="display: block;">
        <section>
          <div id="locate" class="city-title">定位城市</div>
          <div class="city-list city-list-inline clearfix">
            <div class="location-city">定位失败，请点击重试</div>
          </div>
        </section>
        <section class="history-city-list">
          <div id="history" class="city-title">最近访问城市</div>
          <div class="city-list city-list-inline clearfix">
            <div class="city-item" 
            v-for="historyItem in historyCity"
            :key="historyItem.id">{{historyItem.name}}</div>
          </div>
        </section>
        <section>
          <div id="hot" class="city-title">热门城市</div>
          <div class="city-list city-list-inline clearfix">
            <div
              class="city-item"
              @click="getCity(c)"
              v-for="c in hotCities"
              :key="c.id"
            >{{c.name}}</div>
          </div>
        </section>
        <section>
          <div v-for="(value,key) in sortCityList" :key="key">
            <div :id="key" class="city-title city-title-letter">{{key}}</div>
            <div class="city-list city-list-block clearfix">
              <div
                class="city-item"
                @click="getCity(item)"
                v-for="(item,index) in value"
                :key="index"
              >{{item}}</div>
            </div>
          </div>
        </section>
      </section>
    </div>
    <section class="nav">
      <div class="nav-item" data-id="locate" @click="getPosition('locate')">定位</div>
      <div class="nav-item" data-id="history" @click="getPosition('history')">最近</div>
      <div class="nav-item" data-id="hot" @click="getPosition('hot')">热门</div>
      <div
        class="nav-letter nav-item"
        data-id="A"
        v-for="letter in getLetters"
        :key="letter"
        :ref="letter"
        @touchmove="handlerTouch($event)"
        @click="getPosition(letter)"
      >{{letter}}</div>
    </section>
  </div>
</template>
<script>
import { cityList } from "@/api/movie";
import BScroll from "@better-scroll/core";
export default {
  data() {
    return {
      hotCities: [],
      cities: [],
      baseHight: "", //右边导航单个元素的高度
      topHeight: "", //字母A到视口顶部的高度
      currentY: "", //拖动的当前元素
      index: "", //拖动到的元素所属下标
      key: "", //对应的字母
      lastHeight: "", //字母Z距离适口的顶部的距离,
      historyCity:[]
    };
  },
  methods: {
    //点击对应城市存在vuex中，然后在其他页面使用
    getCity(city) {
      this.$store.commit("UPDATE_CITY",city);
      this.$router.go(-1);
      //点击城市，存到本地
      this.$cache.addCity(city)
      //然后取出来放在一个数组里
      this.historyCity=this.$cache.getCity()
    },
    //注册better-scroll
    initScroll() {
      this.scroll = new BScroll("#city-container", {
        click: true,
        scrollY: true,
        pullUpLoad: true,
        probeType: 3
      });
    },
    //点击右侧的锚点调转，使用的是better-scroll的scrollToElement 前提是使用id识别元素
    getPosition(letter) {
      this.scroll.scrollToElement(`#${letter}`, 200);
    },
    handlerTouch(event) {
      console.log(event.touches[0].pageY);
      //当前元素距离视口顶端距离
      this.currentY = event.touches[0].pageY;
      //当前元素在数组中对应的下标
      this.index = Math.floor(
        (this.currentY - this.topHeight) / this.baseHight
      );
      //当前元素对应的字母
      this.key = this.getLetters[this.index];
      //做一个边缘的限制，否则超出会报错
      if (this.currentY < this.topHeight || this.currentY > this.lastHeight) {
        return;
      } else {
        //触发滚动到元素的事件
        this.scroll.scrollToElement(`#${this.key}`);
      }
    }
  },
  async created() {
    let result = await cityList();
    this.hotCities = result.data.cityData.hotCities;
    this.cities = result.data.cityData.cities;
    //获取回来数据以后，dom下一次更新以后执行滚动初始化的事件
    this.$nextTick(() => {
      this.initScroll();
      // console.log(this.$refs["A"][0].offsetHeight);
      //元素的基础高度
      this.baseHight = this.$refs["A"][0].offsetHeight;
      //A距离视口顶端的距离
      this.topHeight = this.$refs["A"][0].getBoundingClientRect().y;
      this.lastHeight = this.$refs["Z"][0].getBoundingClientRect().y;
      // console.log(this.topHeight);
    });
  },
  computed: {
    //把拿回来的数据做a-z的排序
    sortCityList() {
      let sortObj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.cities[String.fromCharCode(i)]) {
          sortObj[String.fromCharCode(i)] = this.cities[String.fromCharCode(i)];
        }
      }
      return sortObj;
    },
    //获取对象数据的key
    getLetters() {
      return Object.keys(this.sortCityList);
    }
  },
  //页面加载完成后取一下数据
  mounted(){
      this.historyCity=this.$cache.getCity()
  }
};
</script>
<style lang="scss" scoped>
.city-container {
  height: 100%;
  overflow: hidden;
}
.city-entry-arrow {
  width: 0;
  height: 0;
  border: 4px solid #b0b0b0;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  display: inline-block;
  margin-left: 4px;
  margin-right: 5px;
  margin-top: 5px;
}
.city-list-container {
  display: none;
  background-color: #ebebeb;
  font-size: 14px;
  color: #333;
  top: 0;
  bottom: 0;
  //   height: 100%;
  width: 100%;
  //   position: absolute;
  //   z-index: 1000;
  //   overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.clearfix:after {
  content: " ";
  display: table;
  clear: both;
}
.city-title {
  padding-left: 15px;
  line-height: 30px;
}
.city-title-letter {
  padding-left: 25px;
}
.city-list {
  padding-right: 30px;
}
.city-list-inline {
  background-color: #f5f5f5;
  padding-bottom: 8px;
}
.city-list-inline .city-item,
.city-list-inline .location-city {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 4%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.city-list-inline .location-city {
  width: auto;
  min-width: 30%;
  padding: 0 20px;
}
.city-list-block {
  background-color: #f5f5f5;
}
.city-list-block .city-item {
  height: 44px;
  line-height: 44px;
  margin-left: 15px;
  border-bottom: 1px solid #c8c7cc;
}
.city-list-block .city-item:last-child {
  border-bottom: none;
}
.nav {
  position: fixed;
  top: 75px;
  top: 11vh;
  right: 0;
  width: 35px;
  z-index: 10;
  text-align: center;
  font-size: 12px;
}
.nav .nav-item {
  height: 16px;
  height: 2.8vh;
}
.nav .nav-letter {
  width: 15px;
  margin-left: 15px;
}
.city-entry {
  padding-left: 15px;
  font-size: 15px;
  color: #666;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.city-entry-arrow {
  width: 0;
  height: 0;
  border: 4px solid #b0b0b0;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  display: inline-block;
  margin-left: 4px;
  margin-top: 5px;
}
.city-entry .city-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70px;
  max-width: 19.2vw;
}
</style>