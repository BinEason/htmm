import axios from '@/utils/request'
import { getToken } from '@/utils/token'

export const loginAPI = ({ mobile, code }) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code

    }
  })
}
export const getUserChannelsAPI = () => {
  return axios({
    url: '/v1_0/user/channels',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  })
}

export const getAllChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

export const getArticleList = ({ channel_id, timestamp }) => {
  return axios({
    url: '/v1_0/articles',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`

    },
    params: {
      channel_id,
      timestamp
    }

  })
}
