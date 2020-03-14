<template>
  <div>
    <Header>
      <template #back>
        <i class="icon-back" @click="back"></i>
        <span class="title">猫眼电影</span>
      </template>
    </Header>
    <div class="search-wrapper" data-search-type="movie">
      <div class="search-header">
        <div class="input-wrapper">
          <img
            class="search-icon"
            src="//s0.meituan.net/bs/?f=myfe/canary:/static/deploy/images/search.png"
            alt
          />
          <input class="search-input" v-model="keyword" type="text" placeholder="搜电影、搜影院" />
          <img
            class="del-input"
            style="display:none"
            src="//s0.meituan.net/bs/?f=myfe/canary:/static/deploy/images/close.png"
            alt
          />
        </div>
        <div class="cancel" @click="$router.go(-1)">取消</div>
      </div>

      <div class="search-history">
        <div class="history-item" v-for="d in keywordList" :key="d" >
          <span class="history-icon"></span>
          <span class="word one-line">{{d}}</span>
          <div class="del-word" @click="handlerDel(d)"></div>
        </div>
      </div>
      <div class="search-result" style="display:none">
        <div class="result-wrapper"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "./Header";
export default {
  data(){
    return{
        keyword:"",
        //从缓存中取
        keywordList:this.$cache.get()
    }
  },
  components: {
    Header
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handlerDel(key){
        //调插件的删除方法先把缓存中的key删除
        this.$cache.del(key)
        //重新给数组赋值  
        this.keywordList=this.$cache.get()
    }
  },
  //监听keyword的变化
  watch:{
      keyword(newval,oldval){
          //监听keyword的变化实现响应式
          this.$cache.add(newval)
          this.keywordList=this.$cache.get()
      }
  }
};
</script>
<style lang="scss" scoped>
.icon-back {
  display: inline-block;
  width: 22.5px;
  height: 22.5px;
  vertical-align: middle;
  position: absolute;
  left: 15px;
  top: 15px;
}
.icon-back:before {
  content: "";
  display: block;
  width: 16px;
  height: 16px;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #fff;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.search-wrapper {
    background-color: #f5f5f5;
    height: 100vh
}

.result-wrapper {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch
}

.search-header {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 8px 0 8px 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    z-index: 1
}

.search-header .input-wrapper {
    padding: 0 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    background-color: #fff;
    -webkit-box-flex: 1;
    flex-grow: 1
}

.search-header .search-icon {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    float: left;
    position: relative;
    top: 6px
}

.search-header .search-input {
    -webkit-box-flex: 1;
    flex: 1;
    border: none;
    font-size: 13px;
    color: #333;
    line-height: 20px;
    padding: 4px 0;
    width: calc(100% - 40px)
}

.search-header .del-input {
    width: 15px;
    height: 15px;
    float: right;
    position: relative;
    top: 6px
}

.search-header .cancel {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 16px;
    color: #f03d37
}

.search-history {
    background-color: #fff
}

.search-history .history-item {
    margin-left: 15px;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    line-height: 44px;
    -webkit-box-align: center;
    align-items: center
}

.search-history .history-item:last-child {
    border-bottom: none
}

.search-history .history-item .history-icon {
    width: 15px;
    height: 15px;
    margin-right: 10px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAVFBMVEUAAACrq6u2traqqqqrq6utra2vr6+qqqqqqqqrq6urq6urq6urq6usrKyqqqqrq6urq6urq6urq6urq6uqqqqsrKyrq6uqqqqvr6+qqqqrq6uqqqqL2Pn/AAAAG3RSTlMA7gf3nBcL5NSxqHFJNN/IwoWDeWNQTyQgNumZiWHTAAABnklEQVRIx5SS2xKDIAxEIwJVQGu91vb//7PdyEynigL74DjiSZZNKKjVyq4tyrJoO2kbSpOYTfH+U2FmEccGT+3YIYKOt/eJbuMF5ir/V1lbtygh1OJsXfqPlTvjHt6WnDTRT3qS3v4jiOl6a9brwFm/ta0DZ8/NplQUlJKb3eeBe3ECFzNrOLfXjtTc767oQurOPf/d8v2MiMzY8D0PeRqKyuyydexTxEHBbn/zrJCLogQpJFSR14gyDSWpwb+j748qkhIl4U4QNGBfDkZROWgWOzRwQyxiT6kg9VhntJzxotNBjUazn42kdJCknzkKTDngBItEK6LROaBGPCtZXr8ckBfbsmObB1pOpcPy5YFY7Y7a73PJA5fvUcuhqjxQcayISOSBAoP4dF4GJwDDQAzrAh2g+y/ap0BwGKR/IOR8tnMfFD54X1X4qvfjCD/OPQ7hcSCAgQWA5AaWHCIfSOQvazXQWrHIGy8y1rHBOjCric0Ke9xgj9mQawTU0MkxV4O1RnkuD7mu9ILUK1kvgb129qLbq3Uv8/v78D0AP8WcS0GTLxhaAAAAAElFTkSuQmCC) no-repeat;
    background-size: contain;
    display: inline-block;
    -webkit-box-flex: 0;
    flex: 0 0 auto
}

.search-history .history-item .word {
    color: #333;
    font-size: 15px;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    display: inline-block
}

@media only screen and (max-device-width: 320px) {
    .search-history .history-item .word {
        max-width:230px
    }
}

.search-history .history-item .del-word {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAASFJREFUKBV9kj2OwjAQhWPTkwppL0ADXZIGutVKHICODglWVLtUXIIOuIBvshfIj4SUKhdAossBEt7LMsFEmJGcmWTeZ09mrOI4PiqlRliLIAiu3huD9hfpNbRzTaiu66+qqv7SNB24uCRJdsgdoB/D+wQXCHKssQsmhM330FbQrcIwTBQCjycRIoyVa60/pewXkIHGa0AGr2CcsuycZKiltSBfbBhlXQB9WOUZasSeQH4kDOB8h+DqbRRFJwHEawnEQ8jyeBIhbrzhZpIX/wTajQC0hcjZ7Ra0IQArlsfuuuDmH7sQ5mQANGY3DB/aUSkkfjBDXjsZrvlHHs8u7Pv+VAP6fgcR52Wwyy7LcuJlWTZEqeFjf3dUFEUfF32GxvVumtjRa2eCUPQAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-position: 15px;
    background-size: 10px;
    -webkit-align-self: center;
    align-self: center;
    padding: 17px 15px;
    width: 10px;
    height: 10px;
    -webkit-box-flex: 0;
    flex: 0 0 auto
}

.hot-search {
    padding: 0 0 8px 15px;
    background-color: #fff;
    position: relative;
    top: -1px
}

.hot-search h3 {
    border-top: 1px solid #e5e5e5;
    padding-top: 17px;
    font-size: 15px;
    color: #666
}

.hot-search .hot-movies-wrap {
    margin-top: 15px;
    padding-right: 15px;
    overflow: hidden
}

.hot-search .hot-movies-wrap .hot-movie {
    float: left;
    padding: 6px 12px;
    margin: 0 12px 12px 0;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 12px;
    color: #333
}

.result-list {
    padding-left: 15px;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch
}

.result {
    margin-bottom: 10px;
    background-color: #fff
}

.result .everyone-search {
    color: #999;
    font-size: 13px;
    padding: 6px 15px;
    background-color: #f5f5f5
}

.result .everyone-search+.list {
    border-top: none
}

.result .no-related-result {
    font-size: 15px;
    color: #999;
    height: 44px;
    line-height: 44px;
    text-align: center
}

.result h3 {
    font-size: 15px;
    color: #999;
    padding: 9px 15px
}

.result .list {
    padding-left: 15px;
    border-top: 1px solid #e6e6e6
}

.result .cell,.result .list {
    border-bottom: 1px solid #e6e6e6
}

.result .cell:last-child {
    border-bottom: none
}

.result .more-result {
    font-size: 15px;
    color: #ef4238;
    line-height: 44px;
    height: 44px;
    text-align: center
}

.result .movie {
    padding: 12px 0;
    min-height: 90px
}

.result .movie .name-score {
    font-size: 16px;
    color: #222;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-bottom: 2px
}

.result .movie .name-score .name {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-flex: 1;
    flex-grow: 1;
    max-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}

.result .movie .name-score .name .one-line {
    display: inline-block;
    font-weight: 700;
    font-size: 17px
}

.result .movie .name-score .score,.result .movie .name-score .wish {
    color: #fa0;
    font-size: 10px;
    flex-shrink: 0;
    padding-left: 5px
}

.result .movie .name-score .num {
    font-size: 16px
}

.result .movie .name-score .no-score {
    font-size: 14px;
    color: #666;
    flex-shrink: 0
}

.result .movie .detail-section {
    position: relative
}

.result .movie .detail-section .detail-items {
    -webkit-box-flex: 1;
    flex-grow: 1;
    overflow: hidden;
    padding-right: 10px;
    margin-right: 48px;
    min-height: 27px
}

.result .movie .detail-section .catogary,.result .movie .detail-section .ename,.result .movie .detail-section .release {
    font-size: 13px;
    color: #666;
    margin-top: 2px
}

.result .movie .detail-section .btn,.result .movie .detail-section .buy-btn {
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    line-height: 13px;
    margin-bottom: 7px;
    -webkit-align-self: flex-end;
    align-self: flex-end;
    flex-shrink: 0;
    width: 48px;
    text-align: center;
    height: 27px;
    line-height: 27px;
    right: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto
}

.result .movie .detail-section .sale {
    background-color: #ef4238
}

.result .movie .detail-section .presale {
    background-color: #3c9fe6
}

.result .movie .detail-section .toggle-wish-btn[data-wishst="0"] {
    background-color: #faaf00;
    border: none;
    color: #fff
}

.result .movie .detail-section .toggle-wish-btn[data-wishst="1"] {
    background-color: #fff;
    border: 1px solid #eaeaea;
    color: #666
}

.result .movie .poster {
    background-color: #eee;
    width: 64px;
    height: 90px;
    float: left;
    margin-right: 10px
}

.result .movie .info {
    margin-right: 15px;
    margin-top: 1px
}

.result .cinema {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 15px 15px 15px 0
}

.result .cinema .info {
    -webkit-box-flex: 1;
    flex: 1;
    overflow: hidden
}

.result .cinema .name-price {
    font-size: 16px;
    color: #000;
    margin-bottom: 6px;
    display: -webkit-box;
    display: flex
}

.result .cinema .sell-price {
    font-size: 11px;
    color: #999;
    white-space: nowrap;
    margin-left: 10px
}

.result .cinema .price {
    font-size: 17px;
    color: #ef4238
}

.result .cinema .address {
    font-size: 13px;
    color: #999
}

.result .cinema .feature-tags {
    margin-top: 7px
}

.result .cinema .feature-tags span {
    border: 1px solid #589daf;
    color: #589daf;
    position: relative;
    display: inline-block;
    padding: 0 3px;
    height: 15px;
    line-height: 15px;
    border-radius: 2px;
    font-size: .6rem
}

.result .cinema .feature-tags span.featrue {
    color: #f90;
    border-color: #f90
}

.result .cinema .distance {
    font-size: 13px;
    color: #999
}
</style>