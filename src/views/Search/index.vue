<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()"/>
      <!-- 搜索组件 -->
      <van-search v-focus @input="inputfn" @search="searchFn" placeholder="请输入搜索关键词" background="#007BFF" shape="round" v-model.trim="kw" />
    </div>
    <div class="sugg-list" v-if="kw.length !== 0">
    <div class="sugg-item" v-for="(obj,index) in resultList" :key="index" @click="suggestClick(obj)" v-html="lightFn(obj,kw)" >

    </div>
</div>
<!-- 搜索历史 -->
<div class="search-history" v-else>
    <!-- 标题 -->
    <van-cell title="搜索历史" >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
 <van-icon name="delete" class="search-icon" @click="delFn" />
        </template>
    </van-cell>

    <!-- 历史列表 -->
    <div class="history-list">
        <span class="history-item" v-for="(obj,index) in history" :key="index" @click="historyClick(obj)">{{obj}}</span>
    </div>
</div>

  </div>
</template>

<script>
// import { Toast } from 'vant'
import { suggestListAPI } from '@/api'
// import { Search } from 'vant'

export default {
  name: 'Search',

  data () {
    return {
      kw: '', // 搜索关键字,
      timer: null,
      resultList: [],
      history: JSON.parse(localStorage.getItem('his')) || []

    }
  },
  methods: {
    inputfn () {
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.resultList = []
      } else {
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI({
            q: this.kw
          })
          // console.log(res)
          this.resultList = res.data.data.options
          //   console.log(this.resultList)
        }, 1000)
      }
    },
    lightFn (originStr, objStr) {
      if (this.resultList[0] == null) {
        return
      }
      //   return originStr.replaceAll(objStr, `<span style="color: red">${objStr}</span>`)

      // 忽略大小写
      const reg = new RegExp(objStr, 'ig') // g全局变量搜索，i为忽略大小写

      return originStr.replaceAll(reg, (match) => {
        return `<span style="color: red">${match}</span>`
      })
    },
    searchFn () {
      if (this.kw.length > 0) {
        setTimeout(() => {
          this.$router.push({
            path: `/search_result${this.kw}`

          })
        })
        this.history.push(this.kw)
      }
    //   console.log(111)
    },
    suggestClick (obj) {
      if (obj.length > 0) {
        setTimeout(() => {
          this.$router.push({
            path: `/search_result${obj}`

          })
        })
        this.history.push(obj)
      }
    },

    historyClick (obj) {
      setTimeout(() => {
        this.$router.push({
          path: `/search_result${obj}`

        })
      })
    },
    delFn () {
      this.history = []
    }
  },
  watch: {
    history: {
      deep: true,
      handler () {
        const thearr = new Set(this.history) // Set 为无序不重复的集合体
        const arr = Array.from(thearr) // 转化为数组
        localStorage.setItem('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
