<template>

<div>
  <van-nav-bar
  title="登录中心"
/>
<div>
  <van-form @submit="onSubmit">
  <van-field
    required
    v-model="user.mobile"
    name="mobile"
    label="手机号"
    placeholder="请输入11位的手机号"
    :rules="[{ required: true, message: '请输入手机号',pattern:/^1[3-9]\d{9}$/ }]"
  />
  <van-field
    required

    v-model="user.code"
    type="password"
    name="code"
    label="密码"
    placeholder="请输入6位密码"
    :rules="[{ required: true, message: '请填写正确的验证码' ,pattern:/^\d{6}$/}]"

  />
  <div style="margin: 16px;">
    <van-button :loading="istrue" :disabled="istrue" loading-text="正在加速登录..." block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
</div>

</div>

</template>

<script>
import { setToken } from '@/utils/token'
import { loginAPI } from '@/api'
import { Toast } from 'vant'

export default {
  data () {
    return {
      user: {
        mobile: '13148754356',
        code: '246810'
      },
      istrue: false
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      this.istrue = true

      try {
        const res = await loginAPI(this.user)
        // console.log(res)
        setToken(res.data.data.token)
        localStorage.setItem('refresh_token', res.data.data.refresh_token)

        this.$router.replace({
          path: this.$route.query.path || '/layout/home'
        })
      } catch (err) {
        Toast({
          message: '验证码错误',
          icon: 'clear'
        })
      }
      this.istrue = false
    }
  }
}
</script>

<style scoped lang="less">
// .van-nav-bar{
//     background-color: #007bff;
// }
// /deep/ .van-nav-bar__title{
//     color: #fff;
// }

</style>
