import axios from '@/utils/request'

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

export const getNewToken = () => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
    }
  })
}

export const getUserChannelsAPI = () => {
  return axios({
    url: '/v1_0/user/channels'

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

    params: {
      channel_id,
      timestamp
    }

  })
}

export const disLikeArtAPI = ({ artId }) => {
  return axios({
    url: '/v1_0/article/dislikes',
    method: 'POST',

    data: {
      target: artId
    }
  })
}

export const articleReportsAPI = ({ target, type, remark }) => {
  return axios({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: target,
      type: type,
      remark: remark
    }

  })
}

export const updateChannelAPI = ({ channels }) => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}

export const suggestListAPI = ({ q }) => {
  return axios({
    url: '/v1_0/suggestion',
    params: {
      q: q
    }
  })
}

export const resultListAPI = ({ page = 1, per_page = 10, q }) => {
  return axios({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}

export const articleDetailAPI = ({ artid }) => {
  return axios({
    url: `/v1_0/articles/${artid}`
  })
}

export const followedUserAPI = ({ art_id }) => {
  return axios({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: art_id
    }
  })
}

export const unFollowedUserAPI = ({ uid }) => {
  return axios({
    // 这uid只是个变量名, 把值拼接在url发给后台(无需指定参数名)
    url: `/v1_0/user/followings/${uid}`,
    method: 'DELETE'
  })
}

// 文章 - 点赞
export const articleLikeAPI = ({ art_id }) => {
  return axios({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: art_id
    }
  })
}

// 文章 - 取消点赞
export const articleDisLikeAPI = ({ uid }) => {
  return axios({
    url: `/v1_0/article/likings/${uid}`,
    method: 'DELETE'
  })
}

export const commentListAPI = ({ id, offset = null, limit = 10 }) => {
  return axios({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: id,
      offset,
      limit
    }
  })
}

// 评论 - 喜欢
export const commentLikingAPI = ({ comId }) => {
  return axios({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}
// 评论-取消喜欢
export const commentDisLikingAPI = ({ comId }) => {
  return axios({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}

export const sendCommentAPI = ({ artId, content }) => {
  return axios({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: artId,
      content: content
    }
  })
}

export const starTextAPI = ({ artId }) => {
  return axios({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

export const unStarTextAPI = ({ artId }) => {
  return axios({
    url: `/v1_0/article/collections/${artId}`,
    method: 'DELETE'

  })
}

export const getUserInfoAPI = () => {
  return axios({
    url: '/v1_0/user'

  })
}

export const userProfileAPI = () => {
  return axios({
    url: '/v1_0/user/profile'
  })
}

export const photoEditAPI = (photo) => {
  return axios({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: photo

  })
}

export const updateUserInfoAPI = ({ name }) => {
  // const obj = {
  //   name: '',
  //   gender: '',
  //   birthday: '',
  //   real_name: '',
  //   intro: ''
  // }
  // for (const k in obj) {
  //   if (dataobj[k] === undefined) {
  //     dataobj[k] = null
  //     obj[k] = dataobj[k]
  //   } else {
  //     obj[k] = dataobj[k]
  //   }
  // }

  return axios({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      gender: 1,
      birthday: '2020-11-13',
      real_name: '666',
      intro: '666'

    }
  })
}
