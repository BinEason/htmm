<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
    @load="onLoad"

    offset="50"

>
  <ArticalItem v-for="obj in arr" :key="obj.art_id" :artlist="obj" @dislikefn="dislikeFn" @reports="reportFn" @click.native="itemClick(obj.art_id)"></ArticalItem>

</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import ArticalItem from './ArticalItem.vue'
import { getArticleList, disLikeArtAPI, articleReportsAPI } from '@/api'
import { Toast } from 'vant'

export default {
  props: {
    channelId: Number
  },
  data: function () {
    return {
      arr: [],
      loading: false,
      finished: false,
      timestamp: +new Date(),
      isLoading: false
    }
  },
  components: {
    ArticalItem
  },

  methods: {
    async  onLoad () {
      const res = await getArticleList({
        channel_id: this.channelId,
        timestamp: this.timestamp
      })
      // console.log(22)
      // console.log(res)
      this.timestamp = res.data.data.pre_timestamp
      // console.log(this.timestamp)
      if (this.timestamp !== null) {
        this.arr = [...this.arr, ...res.data.data.results]
        this.timestamp = res.data.data.pre_timestamp
        this.loading = false
      } else {
        this.loading = false
        this.finished = true
      }
    },
    async onRefresh () {
      this.timestamp = +new Date()
      const res = await getArticleList({
        channel_id: this.channelId,
        timestamp: this.timestamp
      })
      this.timestamp = res.data.data.pre_timestamp
      this.arr = res.data.data.results
      this.isLoading = false
    },
    async dislikeFn (id) {
      try {
        await disLikeArtAPI({
          artId: id
        })
        Toast('已提交')
      } catch (err) {

      }
    },

    async reportFn (id, value) {
      try {
        await articleReportsAPI({
          target: id,
          type: value,
          remark: '这里是写死的'
        })
        Toast('已提交')
      } catch (err) {

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

<style>

</style>
