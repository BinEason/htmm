import theaxios from 'axios'
import router from '@/router'
// import { Toast } from 'vant'
import { getToken, removeToken } from '@/utils/token'
// import { getNewToken } from '@/api'

const axios = theaxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在请求发送之前做一些事情
    if (getToken()?.length > 0 && config.headers.Autorization === undefined) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }

    return config
  },
  function (error) { // 做一些请求错误的事情
    return Promise.reject(error)
  })

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) { // 对响应数据执行操作
    return response
  },
  async function (error) {
  // 对响应错误执行操作
    if (error.response.status === 401) {
      // console.log(error)
      removeToken()
      // 方法一为重新跳转登陆页面获取token
      router.push({ path: `/login?path=${router.currentRoute.fullPath}` })
      // 方法二为刷新token
      // const res = await getNewToken()
      // console.log(res)
      // setToken(res.data.data.token)
      // // 更新错误请求头里面的token
      // error.config.headers.Authorization = `Bearer ${getToken()}`
      // // 重新请求，返回这个config的promise对象
      // return axios(error.config)
    }
    // else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    //   removeToken()
    //   localStorage.removeItem('refresh_token')
    //   Toast('身份已过期')
    //   router.replace('/login')
    // }
    return Promise.reject(error)
  })

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
