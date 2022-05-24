<template>
  <div>
    <Header/>
    <!-- 路由组件出口地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,Footer
  },
mounted() {
  // 通知Vuex发送请求，获取数据，存储于仓库之中
    this.$store.dispatch("getCategoryList");
},
}
</script>

<style scoped>

</style>
