<template>
    <div>
        <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  offset=50

>

      <!-- 搜索结果页-头部导航 -->
      <div class="search-result-container">
        <!-- 点击实现后退效果 -->
        <van-nav-bar
          title="搜索结果"
          left-arrow
          @click-left="$router.go(-1)"
          fixed
        />
      </div>
      <ArticalItem v-for="obj in resultList" :key="obj.art_id" :artlist="obj" @click.native="itemClick(obj.art_id)"></ArticalItem>
        </van-list>
    </div>
</template>

<script>
import { resultListAPI } from '@/api'
import ArticalItem from '../Home/components/ArticalItem.vue'

export default {

  data () {
    return {
      page: 0,
      resultList: [],
      loading: false,
      finished: false
    }
  },
  components: {
    ArticalItem

  },
  name: 'SearchResult',

  methods: {
    async onLoad () {
    //   console.log(111)
      this.finished = false
      this.page++
      const res = await resultListAPI({
        page: this.page,
        q: this.$route.params.keywords
      })
      if (res.data.data.results.length === 10) {
        this.resultList = [...this.resultList, ...res.data.data.results]
        // console.log(this.resultList)
        this.loading = false
      } else if (res.data.data.results.length < 10) {
        this.resultList = [...this.resultList, ...res.data.data.results]
        // console.log(this.resultList)
        this.loading = false
        this.finished = true
      }
    },
    itemClick (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }

}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
