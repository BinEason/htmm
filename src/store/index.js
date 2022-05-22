import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://t7.baidu.com/it/u=1117794894,4154991203&fm=193&f=GIF'

  },
  getters: {
  },
  mutations: {
    SET_PHOTO (state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
