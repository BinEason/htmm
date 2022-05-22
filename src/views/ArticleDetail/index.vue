<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{artobj.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="artobj.aut_name" :label="formate(artobj.pubdate)">
        <template #icon>
          <img :src="artobj.aut_hoto" alt="" class="avatar">
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="artobj.is_followed === true" @click="followchange(true)">已关注</van-button>
            <van-button icon="plus" type="info" size="mini" plain v-else @click="followchange(false)">关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artobj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small" v-if="artobj.attitude===1" @click="likeFn(true)">已点赞</van-button>
        <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="likeFn(false)">点赞</van-button>
      </div>
    </div>
    <div>
      <CommentList @starEV="starFn" :artArr="artobj"></CommentList>
    </div>
  </div>
</template>

<script>
import { articleDetailAPI, followedUserAPI, unFollowedUserAPI, articleLikeAPI, articleDisLikeAPI, starTextAPI, unStarTextAPI } from '@/api'
import CommentList from './CommentList.vue'
import { timeAgo } from '@/utils/date'

export default {
  name: 'Detail',
  data () {
    return {
      artobj: []
    }
  },
  components: {
    CommentList

  },
  async created () {
    const res = await articleDetailAPI({
      artid: this.$route.query.art_id
    })
    // console.log(res)
    this.artobj = res.data.data
  },
  methods: {
    formate: timeAgo,
    async followchange (bool) {
      if (bool === true) {
        // 表示用户想取关
        this.artobj.is_followed = false
        await unFollowedUserAPI({
          uid: this.artobj.aut_id
        })
        // console.log(res)
      } else {
        this.artobj.is_followed = true
        await followedUserAPI({
          art_id: this.artobj.aut_id
        })
        // console.log(res)
      }
    },
    async likeFn (bool) {
      if (bool === true) {
        this.artobj.attitude = 0
        await articleDisLikeAPI({
          uid: this.artobj.art_id
        })
        // console.log(res)
      } else {
        this.artobj.attitude = 1
        await articleLikeAPI({
          art_id: this.artobj.art_id
        })
        // console.log(res)
      }
    },
    async starFn (bool) {
      if (bool === false) {
        // 取消收藏

        this.artobj.is_collected = false
        await unStarTextAPI({
          artId: this.artobj.art_id
        })

        // console.log(res)
      } else {
        this.artobj.is_collected = true
        await starTextAPI({
          artId: this.artobj.art_id
        })
        // console.log(res)
        // console.log(this.artobj)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
    /deep/ img{
        width: 100%;
}
    /deep/ pre {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
