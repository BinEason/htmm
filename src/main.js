import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import 'highlight.js/styles/default.css'
import './allComponent.js'

// 全局注册

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted (el) { // 被隐藏的如display:none 标签只会在第一次执行，不会执行第二次
    if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
      el.focus()
    } else {
      const input = el.querySelector('input')
      const textarea = el.querySelector('textarea')
      if (input) input.focus()
      if (textarea) textarea.focus()
    }
  },
  update (el) {
    if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
      el.focus()
    } else {
      const input = el.querySelector('input')
      const textarea = el.querySelector('textarea')
      if (input) input.focus()
      if (textarea) textarea.focus()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
