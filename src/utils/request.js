import theaxios from 'axios'

const axios = theaxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
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
