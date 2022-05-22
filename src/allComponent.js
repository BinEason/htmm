import Vue from 'vue'

import { CellGroup, Lazyload, Tag, Dialog, NavBar, Form, Field, Button, TabbarItem, Tabbar, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider } from 'vant'

Vue.use(Lazyload,
  {
    preload: 0.8,
    error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e38f5b51d4c0a80121ade0b5c5e8.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655634797&t=9695ecd17a7dacf7dc73590c44568f04'
  })
Vue.use(Dialog)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(VanImage)
Vue.use(Search)
Vue.use(Badge)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
