<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list" :class="{'art-cmt-container-1':isShowCmtInput, 'art-cmt-container-2':!isShowCmtInput}">
      <!-- 评论的 Item 项 -->
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check='false'
>
      <div class="cmt-item" v-for="obj in commentlist" :key="obj.com_id">
        <!-- 头部区域 -->
        <div class="cmt-header">
          <!-- 头部左侧 -->
          <div class="cmt-header-left">
            <img :src="obj.aut_photo" alt="" class="avatar">
            <span class="uname">{{obj.aut_name}}</span>
          </div>
          <!-- 头部右侧 -->
          <div class="cmt-header-right">
            <van-icon name="like" size="16" color="red" v-if="obj.is_liking === true" @click="likeCom(true,obj)" />
            <van-icon name="like-o" size="16" color="gray"  v-else @click="likeCom(false,obj)"/>
          </div>
        </div>
        <!-- 主体区域 -->
        <div class="cmt-body" v-html="obj.content">

        </div>
        <!-- 尾部区域 -->
        <div class="cmt-footer">{{formate(obj.pubdate)}}</div>
      </div>
      </van-list>
    </div>
    <div>
        <!-- 底部添加评论区域 - 1 -->
<div class="add-cmt-box van-hairline--top" v-if="isShowCmtInput">
    <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
    <div class="ipt-cmt-div" @click="toggleFn">发表评论</div>
    <div class="icon-box">
        <van-badge :content="totalCount=== 0 ? '' : totalCount "  max="99">
            <van-icon name="comment-o" size="0.53333334rem" @click="scrollFn"/>
        </van-badge>
        <van-icon name="star-o"  size="0.53333334rem" :color="isStar=== true  ? 'red':'gray'"  @click="starfn" />
        <van-icon name="share-o" size="0.53333334rem" />
    </div>
</div>

<!-- 底部添加评论区域 - 2 -->
<div class="cmt-box van-hairline--top" v-else >
    <textarea placeholder="友善评论、理性发言、阳光心灵" v-focus v-model="comText" @blur="blurFn"></textarea>
    <van-button type="default" :disabled="comText.length === 0" @click="sendFn">发布</van-button>
</div>
    </div>

  </div>
</template>

<script>
import { commentListAPI, commentLikingAPI, commentDisLikingAPI, sendCommentAPI } from '@/api'
import { timeAgo } from '@/utils/date'

export default {
  props: ['artArr'],

  data () {
    return {
      commentlist: [],
      isShowCmtInput: true,
      totalCount: 0,
      comText: '',
      loading: false,
      finished: false,
      lastId: null,
      isStar: false

    }
  },
  async created () {
    const res = await commentListAPI({
      id: this.$route.query.art_id
    })
    this.commentlist = res.data.data.results
    this.totalCount = res.data.data.total_count
    this.lastId = res.data.data.last_id

    if (this.commentlist.length === 0) {
      this.finished = true
    }

    // this.isstar=res.data.data.
  },
  methods: {
    formate: timeAgo,
    async likeCom (bool, comobj) {
      if (bool === true) {
        comobj.is_liking = false
        await commentDisLikingAPI({
          comId: comobj.com_id

        })
        // console.log(res)
      } else {
        comobj.is_liking = true
        // console.log(comobj.s_liking)
        await commentLikingAPI({
          comId: comobj.com_id

        })
        // console.log(res)
      }
    },
    toggleFn () {
      this.isShowCmtInput = false
    },
    scrollFn () {
    //   const now = window.scrollY // 获得当前的距离上边看不见的区域，随时可变 0  100  290
    //   const artHeight = document.querySelector('.article-container').offsetHeight // 1000
    //   //   console.log(artHeight)
    //   const step = (artHeight - now) / 10 // 100 90 81
    //   //   window.scrollTo(0, artHeight)
    //   setTimeout(() => {
    //     if (step < 1) {
    //       window.scrollTo(0, artHeight)
    //       console.log(111)
    //       return
    //     }

      //     window.scrollTo(0, now + step) // 在上一次滚动的距离+本次要滚动的距离 0+100  100+90 290+81

      //     this.scrollFn()
      //   }, 10)

      document.querySelector('.like-box').scrollIntoView({ // html5的新特性
        behavior: 'smooth'
      })
    },
    blurFn () {
      setTimeout(() => {
        this.isShowCmtInput = true
      }, 0)
    },
    async sendFn () {
      const res = await sendCommentAPI({
        artId: this.$route.query.art_id,
        content: this.comText
      })
      // console.log(res)
      this.commentlist.unshift(res.data.data.new_obj)
      this.totalCount++
      // 成功后, 清除输入框内容
      this.comText = ''
      this.scrollFn()
    },
    async  onLoad () {
      if (this.commentlist.length > 0) {
        const res = await commentListAPI({
          id: this.$route.query.art_id,
          offset: this.lastId
        })
        this.commentlist = [...this.commentlist, ...res.data.data.results]
        this.totalCount = res.data.data.total_count
        this.lastId = res.data.data.last_id

        if (this.lastId === null) {
          this.finished = true
        }
        this.loading = false
      } else {
        this.loading = false
      }
    },
    starfn () {
      if (this.isStar === true) {
        this.isStar = false
        this.$emit('starEV', false)
      } else {
        this.isStar = true
        this.$emit('starEV', true)
      }
    }

  },
  watch: {
    artArr: {
      deep: true,
      handler () {
        this.isStar = this.artArr.is_collected
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}

/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
