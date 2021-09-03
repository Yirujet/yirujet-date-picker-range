import Vue from 'vue'
import App from './App.vue'
import './assets/fonts/iconfont.css'

import './components/index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
