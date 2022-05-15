<template>
  <div>
    <van-nav-bar fixed>
      <template #left>
        <p style="color:#fff">黑马头条</p>
      </template>
       <template #right>
    <van-icon name="search" size="0.48rem" color="#fff"/>
  </template>
    </van-nav-bar>

    <div>
      <van-tabs v-model="channelactive" animated sticky  offset-top="1.226667rem" >
       <van-tab :title="obj.name" v-for="obj in channelList" :key="obj.id" :name="obj.id" >
  <AtrticalList :channelId="channelactive"></AtrticalList>

  </van-tab>

</van-tabs>
    </div>

  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api'
import AtrticalList from './components/AtrticalList.vue'

export default {
  data () {
    return {
      channelactive: 0,
      channelList: [],
      ArticleLIst: []
    }
  },
  components: {
    AtrticalList

  },
  async created () {
    const res = await getUserChannelsAPI()
    // console.log(res)
    this.channelList = res.data.data.channels
    // console.log(this.channelList)
  }

}
</script>

<style lang="less" scoped>
/deep/ .van-tabs__content{
    padding-top: 44px;
}

</style>
