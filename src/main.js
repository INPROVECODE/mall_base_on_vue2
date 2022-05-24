import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
// 注册轮播图组件 --全局组件
import Carousel from "@/components/Carousel"
//注册分页器组件 --全局组件
import Pagination from '@/components/Pagination'
// 引入仓库
import store from '@/store'
// 引入mockServe.js--mock数据
import '@/mock/mockServe'
// 引入swiper 样式
import "swiper/css/swiper.css"
//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api'
import {MessageBox} from 'element-ui'
//图片懒加载插件
import VueLazyload from 'vue-lazyload'
//引入懒加载默认图片
import LazyImg from '@/assets/1.gif'
//引入表单校验插件
import "@/plugins/validate"
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:LazyImg
})
Vue.prototype.$msgbox=MessageBox
Vue.prototype.$alert=MessageBox.alert
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
new Vue({
  render: h => h(App),
  //全局事件总线配置
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  // 注册路由（底下写法为k v一致）
  router,
  // 注册仓库：组件实例的身上多了一个$store属性
  store
}).$mount('#app')
