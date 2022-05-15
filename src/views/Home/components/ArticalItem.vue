<template>
<div>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{artlist.title}}</span>
        <img v-if="artlist.cover.type === 1" :src="artlist.cover.images[0]" class="thumb" alt="">
      </div>
      <div class="thumb-box"  v-if="artlist.cover.type > 1">
        <img v-for="(imgUrl,index) in artlist.cover.images" :key="index" :src="imgUrl"  alt="" class="thumb">
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{artlist.aut_name}}</span>
          <span>{{artlist.comm_count}}评论</span>
          <span>{{formate(artlist.pubdate)}}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" @click="show=true"/>
      </div>
    </template>
  </van-cell>
  <van-action-sheet v-model="show" :actions="actions" @select="onSelect" @cancel="cancelFn" @closed="closeFn" get-container="body" :cancel-text="bottomtext" />
</div>
</template>

<script>
import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
export default {
  props: {
    artlist: Object
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      bottomtext: '取消'

    }
  },
  methods: {
    formate: timeAgo,
    onSelect (action, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = true
      if (action.name === '反馈垃圾内容') {
        // 证明点击的是反馈垃圾内容
        this.actions = secondActions
        this.bottomtext = '返回'
      }
    },
    cancelFn () {
      if (this.bottomtext === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomtext = '取消'
      }
    },
    closeFn () {
      this.actions = firstActions
      this.bottomtext = '取消'
    }

  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
