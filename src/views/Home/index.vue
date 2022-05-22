<template>
  <div>
    <van-nav-bar fixed>
      <template #left>
        <p style="color:#fff">新闻资讯</p>
      </template>
       <template #right>
    <van-icon name="search" size="0.48rem" @click="searchAdd" color="#fff"/>
  </template>
    </van-nav-bar>

    <div>
      <van-tabs v-model="channelactive" animated sticky  offset-top="1.226667rem" @change="changeFn" >
       <van-tab :title="obj.name" v-for="obj in channelList" :key="obj.id" :name="obj.id" >

  <AtrticalList :channelId="channelactive"></AtrticalList>

  </van-tab>

</van-tabs>
  <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="pulsAdd"/>

    </div>

<van-popup v-model="show" class="pulsbox"  get-container="body">
<ChannelEdit :userlist="channelList" :unchannel="unChannelList" @addChannelEV="addChannelFn" @delChannelEV="delChannelFn" @closeEV="closeFn" v-model="channelactive"></ChannelEdit>
</van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllChannelsAPI, updateChannelAPI } from '@/api'
import AtrticalList from './components/AtrticalList.vue'
import ChannelEdit from './ChannelEdit.vue'

export default {
  data () {
    return {
      channelactive: 0,
      channelList: [],
      ArticleLIst: [],
      allChannelList: [],
      show: false,
      changeId: {}
    }
  },
  components: {
    AtrticalList,
    ChannelEdit

  },
  async created () {
    const res = await getUserChannelsAPI()
    // console.log(res)
    this.channelList = res.data.data.channels
    // console.log(this.channelList)

    const res1 = await getAllChannelsAPI()
    // console.log(res1)
    this.allChannelList = res1.data.data.channels
  },
  activated () {
    window.addEventListener('scroll', this.scorllFn)
    document.documentElement.scrollTop = this.$route.meta.scorllT
  },
  deactivated () {
    window.removeEventListener('scroll', this.scorllFn)
  },
  methods: {
    pulsAdd () {
      this.show = true
    },
    async addChannelFn (obj) {
      this.channelList.push(obj)
      await updateChannelAPI({
        channels: this.channelList
      })
    },
    async delChannelFn (channelobj) {
      const index = this.channelList.findIndex(obj => obj.id === channelobj.id)
      this.channelList.splice(index, 1)
      await updateChannelAPI({
        channels: this.channelList
      })
    },
    closeFn () {
      this.show = !this.show
    },
    searchAdd () {
      this.$router.push({
        path: '/search'
      })
    },
    scorllFn () {
      this.$route.meta.scorllT = document.documentElement.scrollTop
      this.changeId[this.channelactive] = document.documentElement.scrollTop
      // console.log(this.changeId)
    },
    changeFn () {
      // console.log(111)
      // 由于切换时这个函数会先执行，切回来的一瞬间，此时的组件的高度会变为0，导致取出来的scrollTop为0

      // 通过 this.$nextTick() 等待Dom更新完，再执行里面的回调函数，等到高度不再为0，才能取到滚动的地方

      this.$nextTick(() => {
        document.documentElement.scrollTop = this.changeId[this.channelactive]
      })
    }

  },
  computed: {
    unChannelList () {
      return this.allChannelList.filter(obj => {
        const index = this.channelList.findIndex(obj2 => {
          return (obj2.id === obj.id)
        })

        if (index === -1) { return true } else {
          return false
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
/deep/ .van-tabs__content{
    padding-top: 44px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.pulsbox{
  width: 100vw;
  height: 100vh;
}

</style>
