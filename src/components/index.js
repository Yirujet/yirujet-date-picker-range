import Vue from "vue"
import XwDate from './Index.vue'
import '../assets/fonts/iconfont.css'

const Components = {
    XwDate
}

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])
})

export default Components