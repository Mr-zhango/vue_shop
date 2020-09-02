import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// quill 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 一定要引入这三个css，不然文本编辑器会出现不规则黑白几何图形
// 这三个css可以在main.js中引入，也可以在具体使用的.vue文件中引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// axios
import axios from 'axios'
// TreeTable
import TreeTable from 'vue-table-with-tree-grid'
// NProgress 的 js 和 css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.config.productionTip = false

// 设置axios请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 在request拦截器中,展示进度条 NProgress.start()

// 基于拦截器实现进度条的展示和隐藏
axios.interceptors.request.use(config => {
  NProgress.start()
  // // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须return config
  return config
})

// 在response拦截器中,隐藏进度条 NProgress.done()

axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios
// 将 quill 富文本编辑器 注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.component('tree-table', TreeTable)
Vue.filter('dateFormat', function (orinignVal) {
  const dt = new Date(orinignVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMonth() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
