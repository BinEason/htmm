<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="userList.photo" @click="avatarFn"/>
          <input
               type="file"
               ref="iptFile"
               v-show="false"
               accept="image/*"
               @change="onFileChange"
               />
        </template>
      </van-cell>
      <van-cell title="名称" is-link  :value="userList.name" @click="nameFn" />
      <van-cell title="生日" is-link  :value="userList.birthday" @click="birthdayFn"/>
    </van-cell-group>

    <van-dialog v-model="show" title="用户名" show-cancel-button :before-close="beforeCloseFn">
    <input type="text" v-focus v-model="inputUserName"  >
   </van-dialog>
  </div>
</template>

<script>
import { userProfileAPI, photoEditAPI, updateChannelAPI } from '@/api'
import { Toast } from 'vant'

export default {
  data () {
    return {
      userList: {},
      show: false,
      inputUserName: ''
    }
  },
  name: 'UserEdit',
  async created () {
    const res = await userProfileAPI()
    console.log(res)
    this.userList = res.data.data
  },
  methods: {
    avatarFn () {
      this.$refs.iptFile.click()
    },
    async onFileChange (e) {
      console.log(e.target.files[0])
      if (e.target.files.length === 0) return
      const thephoto = new FormData()
      thephoto.append('photo', e.target.files[0]) // 键值对
      const res = await photoEditAPI(thephoto)
      // console.log(res)
      this.userList.photo = res.data.data.photo
    },
    nameFn () {
      this.show = true
      this.inputUserName = this.userList.name
    },
    async beforeCloseFn (action, done) {
      if (action === 'confirm') {
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputUserName)) {
          // 通过了校验
          const res = await updateChannelAPI({
            name: this.inputUserName

          })
          console.log(res)
          this.inputUserName = this.userList.name
          done()
        } else {
          Toast('请输入1-7位中英数字')

          done(false)
        }
      } else if (action === 'cancel') {
        done()
      }
    },
    birthdayFn () {
      console.log(78)
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
::v-deep .van-dialog__content{
  text-align: center;
  input{
    border: 0;
    outline: none;
    padding: 0;
    text-align: center;

  }
}
</style>
