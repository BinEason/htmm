<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross" @click="closeFn" size="0.37333334rem" color="white" />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span>我的频道
          <span class="small-title">
            {{istrue ? '点击删除频道':'点击进入频道'}}
          </span>
        </span>
        <span @click="editFn">{{istrue?'完成':'编辑' }}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="obj in userlist" :key="obj.id"  @click="delChannel(obj)">
          <div class="channel-item van-hairline--surround">
            {{obj.name}}
            <!-- 删除的徽标 -->
            <van-badge color="transparent" class="cross-badge" v-if="istrue && obj.id !== 0" >
              <template #content>
                <van-icon
                  name="cross"
                  class="badge-icon"
                  color="#cfcfcf"
                  size="0.32rem"
                />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="obj in unchannel" :key="obj.id">
          <div class="channel-item van-hairline--surround" @click="addChannel(obj)">{{obj.name}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userlist', 'unchannel'],
  data: function () {
    return {
      istrue: false
    }
  },
  methods: {
    editFn () {
      this.istrue = !this.istrue
    },
    addChannel (obj) {
      if (this.istrue === true && obj.name !== '推荐') { this.$emit('addChannelEV', obj) }
    },
    delChannel (obj) {
      // console.log(111)
      if (this.istrue === true && obj.name !== '推荐') { this.$emit('delChannelEV', obj) } else if (this.istrue === false) {
        // console.log(11)
        this.$emit('closeEV')
        this.$emit('input', obj.id)
      }
    },
    closeFn () {
      this.$emit('closeEV')
    }
  }

}
</script>

<style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>
