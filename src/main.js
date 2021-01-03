import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import './styles/common.scss'
import 'normalize.css'

import './plugins/element-ui.js'
import './plugins/axios.js'
import './plugins/moment.js'
import './plugins/common.js'
import './plugins/permission.js'
import './plugins/pageTabs.js'
import './filter'
import './directives'
import './components'

Vue.config.productionTip = false
//系统错误捕获
Vue.config.errorHandler = (error, vm)=>{
  console.log('全局异常',error);
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
